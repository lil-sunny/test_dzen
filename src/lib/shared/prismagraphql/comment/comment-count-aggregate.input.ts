import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CommentCountAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    author_id?: true;

    @Field(() => Boolean, {nullable:true})
    post_id?: true;

    @Field(() => Boolean, {nullable:true})
    text?: true;

    @Field(() => Boolean, {nullable:true})
    additional_file_path?: true;

    @Field(() => Boolean, {nullable:true})
    _all?: true;
}
