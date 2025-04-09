import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentCreateWithoutReplyToInput } from './comment-create-without-reply-to.input';
import { Type } from 'class-transformer';
import { CommentCreateOrConnectWithoutReplyToInput } from './comment-create-or-connect-without-reply-to.input';
import { CommentUpsertWithWhereUniqueWithoutReplyToInput } from './comment-upsert-with-where-unique-without-reply-to.input';
import { CommentCreateManyReplyToInputEnvelope } from './comment-create-many-reply-to-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CommentWhereUniqueInput } from './comment-where-unique.input';
import { CommentUpdateWithWhereUniqueWithoutReplyToInput } from './comment-update-with-where-unique-without-reply-to.input';
import { CommentUpdateManyWithWhereWithoutReplyToInput } from './comment-update-many-with-where-without-reply-to.input';
import { CommentScalarWhereInput } from './comment-scalar-where.input';

@InputType()
export class CommentUncheckedUpdateManyWithoutReplyToNestedInput {

    @Field(() => [CommentCreateWithoutReplyToInput], {nullable:true})
    @Type(() => CommentCreateWithoutReplyToInput)
    create?: Array<CommentCreateWithoutReplyToInput>;

    @Field(() => [CommentCreateOrConnectWithoutReplyToInput], {nullable:true})
    @Type(() => CommentCreateOrConnectWithoutReplyToInput)
    connectOrCreate?: Array<CommentCreateOrConnectWithoutReplyToInput>;

    @Field(() => [CommentUpsertWithWhereUniqueWithoutReplyToInput], {nullable:true})
    @Type(() => CommentUpsertWithWhereUniqueWithoutReplyToInput)
    upsert?: Array<CommentUpsertWithWhereUniqueWithoutReplyToInput>;

    @Field(() => CommentCreateManyReplyToInputEnvelope, {nullable:true})
    @Type(() => CommentCreateManyReplyToInputEnvelope)
    createMany?: CommentCreateManyReplyToInputEnvelope;

    @Field(() => [CommentWhereUniqueInput], {nullable:true})
    @Type(() => CommentWhereUniqueInput)
    set?: Array<Prisma.AtLeast<CommentWhereUniqueInput, 'id'>>;

    @Field(() => [CommentWhereUniqueInput], {nullable:true})
    @Type(() => CommentWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<CommentWhereUniqueInput, 'id'>>;

    @Field(() => [CommentWhereUniqueInput], {nullable:true})
    @Type(() => CommentWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<CommentWhereUniqueInput, 'id'>>;

    @Field(() => [CommentWhereUniqueInput], {nullable:true})
    @Type(() => CommentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CommentWhereUniqueInput, 'id'>>;

    @Field(() => [CommentUpdateWithWhereUniqueWithoutReplyToInput], {nullable:true})
    @Type(() => CommentUpdateWithWhereUniqueWithoutReplyToInput)
    update?: Array<CommentUpdateWithWhereUniqueWithoutReplyToInput>;

    @Field(() => [CommentUpdateManyWithWhereWithoutReplyToInput], {nullable:true})
    @Type(() => CommentUpdateManyWithWhereWithoutReplyToInput)
    updateMany?: Array<CommentUpdateManyWithWhereWithoutReplyToInput>;

    @Field(() => [CommentScalarWhereInput], {nullable:true})
    @Type(() => CommentScalarWhereInput)
    deleteMany?: Array<CommentScalarWhereInput>;
}
