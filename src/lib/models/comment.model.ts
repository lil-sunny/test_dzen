import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from './post.model';
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

  @Field()
  additional_file_path: string;

  @Field(() => Int)
  reply_to_comment_id: number;

  @Field(() => Post)
  post: Post;

  @Field(() => User)
  author: User;
}
