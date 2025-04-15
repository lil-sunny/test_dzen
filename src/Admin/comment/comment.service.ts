import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';
import { FileUpload } from 'graphql-upload';
import { User } from 'src/lib/models/user.model';
import { Comment } from '../../lib/models/comment.model';

export interface CommentInterface {
  id: number;
  post_id: number;
  reply_to_comment_id: number | null;
  text: string;
  author_id: number;
  createdAt: Date;
  updatedAt: Date;
  additional_file_path: string | null;
  user?: User;
  replies: CommentInterface[];
}

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getCommentsOnPost(post_id: number): Promise<CommentInterface[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        post_id: post_id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const authorIds: number[] = [];

    comments.forEach((comment) => {
      if (!authorIds.includes(comment.author_id)) {
        authorIds.push(comment.author_id);
      }
    });

    const users = await this.prisma.user.findMany({
      where: { id: { in: authorIds } },
    });

    const usersMap = new Map<number, User>();
    users.forEach((user) => usersMap.set(Number(user.id), user));

    const commentsMap = new Map<number, CommentInterface & { user?: User }>();
    const result: (CommentInterface & { user?: User })[] = [];

    comments.forEach((comment) => {
      commentsMap.set(comment.id, {
        ...comment,
        replies: [],
        user: usersMap.get(Number(comment.author_id)),
      });
    });

    comments.forEach((comment) => {
      const currentComment = commentsMap.get(comment.id)!;

      if (comment.reply_to_comment_id) {
        const parent = commentsMap.get(comment.reply_to_comment_id);
        if (parent) {
          parent.replies.push({
            ...currentComment,
            user: usersMap.get(currentComment.author_id),
          });
        } else {
          comment.reply_to_comment_id = null;
          result.push(currentComment);
        }
      } else {
        result.push(currentComment);
      }
    });

    return result;
  }

  async getComment(comment_id: number): Promise<Comment | null> {
    const result = await this.prisma.comment.findFirst({
      where: {
        id: comment_id,
      },
      include: {
        user: true,
      },
    });

    return result;
  }

  async addComment(data: CommentDto) {
    const { text, author_id, post_id, file, reply_to_comment_id } = data;
    console.log(data);

    const additional_file_path = '';

    if (file) {
      try {
        const uploadedFile = await file;

        console.log(uploadedFile.filename);

        const newFileName = this.generateUniqueFileName(uploadedFile.filename);
        uploadedFile.filename = newFileName;
        // additional_file_path = await this.saveFile(uploadedFile);
      } catch (error) {
        console.log(error);
        throw new HttpException('File upload failed', HttpStatus.BAD_REQUEST);
      }
    }

    let replyId: number | null = null;

    if (reply_to_comment_id !== undefined && reply_to_comment_id !== null) {
      const id = Number(reply_to_comment_id);
      if (isNaN(id)) {
        throw new HttpException(
          'Invalid reply_to_comment_id',
          HttpStatus.BAD_REQUEST,
        );
      }

      const parentComment = await this.prisma.comment.findUnique({
        where: { id },
      });

      if (!parentComment) {
        throw new HttpException(
          'Comment to reply not found',
          HttpStatus.BAD_REQUEST,
        );
      }

      replyId = id;
    }

    const comment = await this.prisma.comment.create({
      data: {
        text,
        author_id,
        post_id,
        additional_file_path,
        reply_to_comment_id: replyId,
      },
      include: {
        user: true,
      },
    });

    return comment;
  }

  saveFile(file: FileUpload, commentId: number) {
    console.log(file.filename, commentId);
  }

  generateUniqueFileName(filename: string): string {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 3);
    const fileExtension = filename.split('.').pop();
    return `${uniqueSuffix}.${fileExtension}`;
  }

  async validateFile(file: FileUpload): Promise<void> {
    const { mimetype } = file;

    if (mimetype !== 'image/jpeg' && mimetype !== 'text/plain') {
      throw new HttpException(
        'File type must be JPG/JPEG or text file',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (mimetype === 'text/plain') {
      const size = await this.getFileSize(file);
      if (size > 100 * 1024) {
        throw new HttpException(
          'Text file must be less than 100 KB',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (mimetype === 'image/jpeg') {
      this.resizeImage(file); // Викликаємо функцію для зміни розміру зображення
    }
  }

  private async getFileSize(file: FileUpload): Promise<number> {
    const stream = file.createReadStream();
    return new Promise<number>((resolve, reject) => {
      let totalSize = 0;

      stream.on('data', (chunk: Buffer) => {
        totalSize += chunk.length;
      });

      stream.on('end', () => resolve(totalSize));
      stream.on('error', (err: Error) => reject(err));
    });
  }

  private resizeImage(file: FileUpload) {
    const { filename } = file;
    // Реалізація зміни розміру зображення за допомогою бібліотеки, наприклад, sharp
    return filename;
  }
}
