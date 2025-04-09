import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Post } from '../post/post.model';
import { User } from '../user/user.model';
import { CommentCount } from './comment-count.output';

@ObjectType()
export class Comment {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    author_id!: number;

    @Field(() => Int, {nullable:false})
    post_id!: number;

    @Field(() => String, {nullable:false})
    text!: string;

    @Field(() => String, {nullable:true})
    additional_file_path!: string | null;

    @Field(() => Int, {nullable:true})
    reply_to_comment_id!: number | null;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => Comment, {nullable:true})
    replyTo?: Comment | null;

    @Field(() => [Comment], {nullable:true})
    replies?: Array<Comment>;

    @Field(() => Post, {nullable:false})
    post?: Post;

    @Field(() => User, {nullable:false})
    author?: User;

    @Field(() => CommentCount, {nullable:false})
    _count?: CommentCount;
}
