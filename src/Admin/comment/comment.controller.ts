import { Controller, Post, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('auth')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async addComment(@Body() commentDto: CommentDto) {
    return this.commentService.addComment(commentDto);
  }
}
