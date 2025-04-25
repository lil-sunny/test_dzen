import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CommentDto {
  @Field(() => Int)
  author_id: number;

  @Field(() => Int)
  post_id: number;

  @Field(() => String)
  text: string;

  @Field(() => Int, { nullable: true })
  reply_to_comment_id: number;
}
