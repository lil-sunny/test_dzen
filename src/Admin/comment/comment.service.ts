import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';
import { FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import fs from 'fs';
import { join } from 'path';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getCommentsToPost(post_id) {

  }

  async addComment(data: CommentDto) {
    const { text, author_id, post_id, file, reply_to_comment_id } = data;

    let additional_file_path: string = '';

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

    // Створення нового коментаря в базі даних
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

  // Валідація файлу
  async validateFile(file: FileUpload): Promise<void> {
    const { mimetype } = file;

    // Перевірка типу файлу
    if (mimetype !== 'image/jpeg' && mimetype !== 'text/plain') {
      throw new HttpException(
        'File type must be JPG/JPEG or text file',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Перевірка розміру текстових файлів (менше 100 KB)
    if (mimetype === 'text/plain') {
      const size = await this.getFileSize(file);
      if (size > 100 * 1024) {
        throw new HttpException(
          'Text file must be less than 100 KB',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // Якщо це зображення, перевіряємо і змінюємо його розмір
    if (mimetype === 'image/jpeg') {
      this.resizeImage(file);
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
    return filename;
  }
}
