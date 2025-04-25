import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';
import { FileUpload } from 'graphql-upload';
// import { User } from 'src/lib/models/user.model';
import { Comment } from '../../lib/models/comment.model';
// import { FileInterceptor } from '@nestjs/platform-express';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

export interface CommentInterface {
  id: number;
  post_id: number;
  reply_to_comment_id: number | null;
  text: string;
  author_id: number;
  createdAt: Date;
  updatedAt: Date;
  additional_file_path: string | null;
}

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getCommentsOnPost(post_id: number): Promise<Comment[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        post_id: post_id,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        user: true,
      },
    });

    return comments;
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
    const { text, author_id, post_id, reply_to_comment_id } = data;

    const additional_file_path = '';

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

  async validateFile(file: Express.Multer.File, commentId: number) {
    const { mimetype } = file;

    if (mimetype !== 'image/jpeg' && mimetype !== 'text/plain') {
      throw new HttpException(
        'File type must be JPG/JPEG or text file',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (mimetype === 'text/plain') {
      console.log(file);
      try {
        const size = file.size;

        if (size > 100 * 1024) {
          throw new HttpException(
            'Text file must be less than 100 KB',
            HttpStatus.BAD_REQUEST,
          );
        }

        const datePrefix: string = new Date()
          .toISOString()
          .replace(/[-:T.]/g, '');

        const uniqueName: string = `${datePrefix}_${file.originalname}`;

        const outputPath = path.join(__dirname, '../../../uploads', uniqueName);

        fs.writeFileSync(outputPath, file.buffer);

        await this.saveAdditinalFilePathToComment(
          `/uploads/${uniqueName}`,
          Number(commentId),
        );

        console.log(`Text file saved at ${outputPath}`);

        return outputPath;
      } catch (e) {
        throw new HttpException('Invalid risizing', HttpStatus.BAD_REQUEST, e);
      }
    }

    if (mimetype === 'image/jpeg') {
      await this.resizeImage(file, commentId);
    }
  }

  async resizeImage(file: Express.Multer.File, commentId: number) {
    const datePrefix: string = new Date().toISOString().replace(/[-:T.]/g, '');
    const uniqueName: string = `${datePrefix}_${file.originalname}`;

    const outputPath = path.join(__dirname, '../../../uploads', uniqueName);

    try {
      await sharp(file.buffer)
        .resize(360, 360, {
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .toFile(outputPath);

      await this.saveAdditinalFilePathToComment(
        `/uploads/${uniqueName}`,
        Number(commentId),
      );

      return outputPath;
    } catch (e) {
      console.log('Invalid resizing', HttpStatus.BAD_REQUEST, e);
      throw new HttpException('Invalid resizing', HttpStatus.BAD_REQUEST, e);
    }
    // fs.unlinkSync(file.path);
  }

  async saveAdditinalFilePathToComment(filePath: string, commentId: number) {
    const result = await this.prisma.comment.update({
      where: { id: Number(commentId) },
      data: {
        additional_file_path: filePath,
      },
      include: {
        user: true,
      },
    });

    console.log(result);
  }
}
