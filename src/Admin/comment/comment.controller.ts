import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommentService } from './comment.service';
// import { CommentDto } from './dto/comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // @Post()
  // async addComment(@Body() commentDto: CommentDto) {
  //   return this.commentService.addComment(commentDto);
  // }

  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('commentId') commentId: number,
  ) {
    console.log('Файл:', file);
    console.log('commentId:', commentId);

    // Приклад відповіді:
    return {
      message: 'Файл завантажено',
      path: `/uploads/${file.filename}`,
      commentId,
    };
  }
}
