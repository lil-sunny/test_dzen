import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from './post.model';
import { Comment } from './comment.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  avatar_path: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Post]) // Вказуємо, що це масив постів
  posts: Post[];

  @Field(() => [Comment]) // Вказуємо, що це масив коментарів
  comments: Comment[];
}
