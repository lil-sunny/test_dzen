import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PostOrderByRelevanceFieldEnum } from './post-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class PostOrderByRelevanceInput {

    @Field(() => [PostOrderByRelevanceFieldEnum], {nullable:false})
    fields!: Array<`${PostOrderByRelevanceFieldEnum}`>;

    @Field(() => SortOrder, {nullable:false})
    sort!: `${SortOrder}`;

    @Field(() => String, {nullable:false})
    search!: string;
}
