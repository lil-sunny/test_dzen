import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class CommentAvgAggregate {

    @Field(() => Float, {nullable:true})
    id?: number;

    @Field(() => Float, {nullable:true})
    author_id?: number;

    @Field(() => Float, {nullable:true})
    post_id?: number;

    @Field(() => Float, {nullable:true})
    reply_to_comment_id?: number;
}
