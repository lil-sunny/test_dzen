import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class CommentCreateManyPostInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => Int, {nullable:false})
    author_id!: number;

    @Field(() => String, {nullable:false})
    text!: string;

    @Field(() => String, {nullable:false})
    additional_file_path!: string;
}
