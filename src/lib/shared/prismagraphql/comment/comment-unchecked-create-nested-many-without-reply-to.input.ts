import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentCreateWithoutReplyToInput } from './comment-create-without-reply-to.input';
import { Type } from 'class-transformer';
import { CommentCreateOrConnectWithoutReplyToInput } from './comment-create-or-connect-without-reply-to.input';
import { CommentCreateManyReplyToInputEnvelope } from './comment-create-many-reply-to-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CommentWhereUniqueInput } from './comment-where-unique.input';

@InputType()
export class CommentUncheckedCreateNestedManyWithoutReplyToInput {

    @Field(() => [CommentCreateWithoutReplyToInput], {nullable:true})
    @Type(() => CommentCreateWithoutReplyToInput)
    create?: Array<CommentCreateWithoutReplyToInput>;

    @Field(() => [CommentCreateOrConnectWithoutReplyToInput], {nullable:true})
    @Type(() => CommentCreateOrConnectWithoutReplyToInput)
    connectOrCreate?: Array<CommentCreateOrConnectWithoutReplyToInput>;

    @Field(() => CommentCreateManyReplyToInputEnvelope, {nullable:true})
    @Type(() => CommentCreateManyReplyToInputEnvelope)
    createMany?: CommentCreateManyReplyToInputEnvelope;

    @Field(() => [CommentWhereUniqueInput], {nullable:true})
    @Type(() => CommentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CommentWhereUniqueInput, 'id'>>;
}
