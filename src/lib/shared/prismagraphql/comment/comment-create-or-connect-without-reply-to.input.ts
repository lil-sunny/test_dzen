import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CommentWhereUniqueInput } from './comment-where-unique.input';
import { Type } from 'class-transformer';
import { CommentCreateWithoutReplyToInput } from './comment-create-without-reply-to.input';

@InputType()
export class CommentCreateOrConnectWithoutReplyToInput {

    @Field(() => CommentWhereUniqueInput, {nullable:false})
    @Type(() => CommentWhereUniqueInput)
    where!: Prisma.AtLeast<CommentWhereUniqueInput, 'id'>;

    @Field(() => CommentCreateWithoutReplyToInput, {nullable:false})
    @Type(() => CommentCreateWithoutReplyToInput)
    create!: CommentCreateWithoutReplyToInput;
}
