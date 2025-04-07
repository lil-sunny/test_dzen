import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Post } from '../post/post.model';
import { User } from '../user/user.model';

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

    @Field(() => String, {nullable:false})
    additional_file_path!: string;

    @Field(() => Post, {nullable:false})
    post?: Post;

    @Field(() => User, {nullable:false})
    author?: User;
}
