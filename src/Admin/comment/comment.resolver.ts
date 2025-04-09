import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { Comment } from '../../lib/models/comment.model';

@Resolver()
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @Query(() => [Comment])
  async getCommentsToPost(
    @Args('post_id', { type: () => Int }) post_id: number,
  ) {
    const result = await this.commentService.getCommentsToPost(post_id);
    return result;
  }

  @Mutation(() => String)
  async addComment(@Args('commentDto') commentDto: CommentDto) {
    const result = await this.commentService.addComment(commentDto);
    return result;
  }
}
