import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class CommentSumAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:true})
    author_id?: number;

    @Field(() => Int, {nullable:true})
    post_id?: number;

    @Field(() => Int, {nullable:true})
    reply_to_comment_id?: number;
}
