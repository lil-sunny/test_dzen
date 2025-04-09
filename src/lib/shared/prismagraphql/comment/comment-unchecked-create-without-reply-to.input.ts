import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CommentUncheckedCreateNestedManyWithoutReplyToInput } from './comment-unchecked-create-nested-many-without-reply-to.input';

@InputType()
export class CommentUncheckedCreateWithoutReplyToInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:false})
    author_id!: number;

    @Field(() => Int, {nullable:false})
    post_id!: number;

    @Field(() => String, {nullable:false})
    text!: string;

    @Field(() => String, {nullable:true})
    additional_file_path?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => CommentUncheckedCreateNestedManyWithoutReplyToInput, {nullable:true})
    replies?: CommentUncheckedCreateNestedManyWithoutReplyToInput;
}
