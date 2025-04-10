import { Field, InputType, Int } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';

@InputType()
export class CommentDto {
  @Field()
  author_id: number;

  @Field()
  post_id: number;

  @Field()
  text: string;

  @Field(() => Int, { nullable: true })
  reply_to_comment_id: number;

  @Field(() => String, { nullable: true })
  file?: FileUpload;
}
