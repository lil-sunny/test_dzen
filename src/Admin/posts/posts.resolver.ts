import { Query, Resolver } from '@nestjs/graphql'; //Mutation, Args
import { Post } from 'src/lib/models/post.model';
// import { PostDto } from './dto/post.dto';
import { PostService } from './posts.service';
import { AuthGuard } from '../../auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard)
@Resolver('post')
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Post])
  async getPost(): Promise<Post[]> {
    const result = await this.postService.getPosts();
    return result;
  }

  //   @Mutation(() => Post)
  //   async addPost(@Args('postDto') postDto: PostDto): Promise<Post> {
  //     const result = await this.postService.addPost(postDto);
  //     return result;
  //   }

  //   @Mutation(() => Post)
  //   async addComment(@Args('postDto') postDto: PostDto) {
  //     const result = await this.postService.addPost(postDto);
  //     return result;
  //   }
}
