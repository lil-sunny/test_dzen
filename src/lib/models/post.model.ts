import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.model';
import { Comment } from './comment.model';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  image_path: string;

  @Field(() => Int)
  author_id: number;

  @Field(() => User)
  author: User;

  @Field(() => [Comment])
  comments: Comment[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
