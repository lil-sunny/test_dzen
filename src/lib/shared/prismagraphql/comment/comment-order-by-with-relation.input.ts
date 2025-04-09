import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { CommentOrderByRelationAggregateInput } from './comment-order-by-relation-aggregate.input';
import { PostOrderByWithRelationInput } from '../post/post-order-by-with-relation.input';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { CommentOrderByRelevanceInput } from './comment-order-by-relevance.input';

@InputType()
export class CommentOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    author_id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    post_id?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    text?: `${SortOrder}`;

    @Field(() => SortOrderInput, {nullable:true})
    additional_file_path?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    reply_to_comment_id?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: `${SortOrder}`;

    @Field(() => CommentOrderByWithRelationInput, {nullable:true})
    replyTo?: CommentOrderByWithRelationInput;

    @Field(() => CommentOrderByRelationAggregateInput, {nullable:true})
    replies?: CommentOrderByRelationAggregateInput;

    @Field(() => PostOrderByWithRelationInput, {nullable:true})
    post?: PostOrderByWithRelationInput;

    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    author?: UserOrderByWithRelationInput;

    @Field(() => CommentOrderByRelevanceInput, {nullable:true})
    _relevance?: CommentOrderByRelevanceInput;
}
