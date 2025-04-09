import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CommentWhereUniqueInput } from './comment-where-unique.input';
import { Type } from 'class-transformer';
import { CommentUpdateWithoutReplyToInput } from './comment-update-without-reply-to.input';

@InputType()
export class CommentUpdateWithWhereUniqueWithoutReplyToInput {

    @Field(() => CommentWhereUniqueInput, {nullable:false})
    @Type(() => CommentWhereUniqueInput)
    where!: Prisma.AtLeast<CommentWhereUniqueInput, 'id'>;

    @Field(() => CommentUpdateWithoutReplyToInput, {nullable:false})
    @Type(() => CommentUpdateWithoutReplyToInput)
    data!: CommentUpdateWithoutReplyToInput;
}
