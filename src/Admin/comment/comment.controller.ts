import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  // Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommentService } from './comment.service';
// import { CommentDto } from './dto/comment.dto';

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
    return this.commentService.validateFile(file, commentId);
  }
}
