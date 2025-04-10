import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from './comment.model';

@ObjectType()
export class CommentsReplies {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  post_id: number;

  @Field(() => Int, { nullable: true })
  reply_to_comment_id: number | null;

  @Field()
  text: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  additional_file_path: string;

  @Field(() => [Comment], { nullable: true })
  replies?: Comment[];
}
