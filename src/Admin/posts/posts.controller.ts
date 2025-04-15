import { Controller, Get } from '@nestjs/common';
import { PostService } from './posts.service';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts() {
    return await this.postService.getPosts();
  }
}
