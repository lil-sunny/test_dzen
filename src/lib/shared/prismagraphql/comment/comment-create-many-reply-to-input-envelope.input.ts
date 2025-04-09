import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentCreateManyReplyToInput } from './comment-create-many-reply-to.input';
import { Type } from 'class-transformer';

@InputType()
export class CommentCreateManyReplyToInputEnvelope {

    @Field(() => [CommentCreateManyReplyToInput], {nullable:false})
    @Type(() => CommentCreateManyReplyToInput)
    data!: Array<CommentCreateManyReplyToInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
