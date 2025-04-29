import { Args, Query, Resolver } from '@nestjs/graphql'; //Mutation, Args
import { Post } from 'src/lib/models/post.model';
// import { PostDto } from './dto/post.dto';
import { PostService } from './posts.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Int } from 'type-graphql';

@UseGuards(AuthGuard)
@Resolver()
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Post])
  async getPosts(): Promise<Post[]> {
    const result = await this.postService.getPosts();
    return result;
  }

  @Query(() => Post)
  async getPost(
    @Args('post_id', { type: () => Int }) post_id: number,
  ): Promise<Post> {
    const result = await this.postService.getPost(post_id);
    return result;
  }
}
