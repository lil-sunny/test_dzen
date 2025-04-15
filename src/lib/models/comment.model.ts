import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
// import { Post } from './post.model';
import { User } from './user.model';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  author_id: number;

  @Field(() => Int)
  post_id: number;

  @Field()
  text: string;

  @Field(() => String, { nullable: true })
  additional_file_path: string | null;

  @Field(() => Int, { nullable: true })
  reply_to_comment_id: number | null;

  @Field(() => User, { nullable: true })
  user: User | null;

  @Field(() => GraphQLUpload, { nullable: true })
  file?: Promise<FileUpload>;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
