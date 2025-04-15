import { Field, InputType, Int } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

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

  @Field(() => GraphQLUpload, { nullable: true })
  file?: Promise<FileUpload>;
}
