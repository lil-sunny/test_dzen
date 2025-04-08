import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async addComment(@Body() commentDto: CommentDto) {
    return this.commentService.addComment(commentDto);
  }
}
