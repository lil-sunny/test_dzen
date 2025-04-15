import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CommentService, CommentInterface } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { CommentsReplies } from 'src/lib/models/commentsReplies.model';
import { Comment } from '../../lib/models/comment.model';

@Resolver()
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @Query(() => [CommentsReplies])
  async getCommentsOnPost(
    @Args('post_id', { type: () => Int }) post_id: number,
  ): Promise<CommentInterface[]> {
    const result = await this.commentService.getCommentsOnPost(post_id);
    return result;
  }

  @Mutation(() => Comment)
  async addComment(@Args('commentDto') commentDto: CommentDto) {
    const result = await this.commentService.addComment(commentDto);
    return result;
  }

  @Mutation(() => Comment)
  async getComment(
    @Args('comment_id', { type: () => Int }) comment_id: number,
  ): Promise<Comment | null> {
    const result = await this.commentService.getComment(comment_id);
    return result;
  }
}
