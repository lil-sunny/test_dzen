import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';
import { FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import fs from 'fs';
import { join } from 'path';

export interface CommentInterface {
  id: number;
  post_id: number;
  reply_to_comment_id: number | null;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  additional_file_path: string | null;
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

    const commentsMap = new Map<number, CommentInterface>(); // Використовуємо CommentInterface замість Comment
    const result: CommentInterface[] = [];

    comments.forEach((comment) => {
      commentsMap.set(comment.id, { ...comment, replies: [] });
    });

    comments.forEach((comment) => {
      if (comment.reply_to_comment_id) {
        const parentComment = commentsMap.get(comment.reply_to_comment_id);
        if (parentComment) {
          parentComment.replies.push(commentsMap.get(comment.id)!);
        } else {
          comment.reply_to_comment_id = null;
        }
      } else {
        result.push(commentsMap.get(comment.id)!);
      }
    });

    return result;
  }

  async addComment(data: CommentDto) {
    const { text, author_id, post_id, file, reply_to_comment_id } = data;

    let additional_file_path = '';

    if (file) {
      try {
        const newFileName = this.generateUniqueFileName(file.filename);
        file.filename = newFileName;
        additional_file_path = await this.saveFile(file);
      } catch (error) {
        console.log(error);
        throw new HttpException('File upload failed', HttpStatus.BAD_REQUEST);
      }
    }

    const comment = await this.prisma.comment.create({
      data: {
        text,
        author_id,
        post_id,
        additional_file_path,
        reply_to_comment_id,
      },
    });

    return comment;
  }

  async saveFile(file: FileUpload): Promise<string> {
    await this.validateFile(file);

    const { filename } = file;
    const stream = file.createReadStream();

    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = join(uploadDir, `${Date.now()}-${filename}`);

    const writeStream = createWriteStream(filePath);

    await new Promise<void>((resolve, reject) => {
      stream
        .pipe(writeStream)
        .on('finish', () => resolve())
        .on('error', (err) => {
          console.error('Error writing file:', err);
          reject(err);
        });
    });

    return filePath;
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
