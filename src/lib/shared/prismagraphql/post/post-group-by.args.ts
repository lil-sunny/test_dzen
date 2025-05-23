import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PostWhereInput } from './post-where.input';
import { Type } from 'class-transformer';
import { PostOrderByWithAggregationInput } from './post-order-by-with-aggregation.input';
import { PostScalarFieldEnum } from './post-scalar-field.enum';
import { PostScalarWhereWithAggregatesInput } from './post-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { PostCountAggregateInput } from './post-count-aggregate.input';
import { PostAvgAggregateInput } from './post-avg-aggregate.input';
import { PostSumAggregateInput } from './post-sum-aggregate.input';
import { PostMinAggregateInput } from './post-min-aggregate.input';
import { PostMaxAggregateInput } from './post-max-aggregate.input';

@ArgsType()
export class PostGroupByArgs {

    @Field(() => PostWhereInput, {nullable:true})
    @Type(() => PostWhereInput)
    where?: PostWhereInput;

    @Field(() => [PostOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<PostOrderByWithAggregationInput>;

    @Field(() => [PostScalarFieldEnum], {nullable:false})
    by!: Array<`${PostScalarFieldEnum}`>;

    @Field(() => PostScalarWhereWithAggregatesInput, {nullable:true})
    having?: PostScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => PostCountAggregateInput, {nullable:true})
    _count?: PostCountAggregateInput;

    @Field(() => PostAvgAggregateInput, {nullable:true})
    _avg?: PostAvgAggregateInput;

    @Field(() => PostSumAggregateInput, {nullable:true})
    _sum?: PostSumAggregateInput;

    @Field(() => PostMinAggregateInput, {nullable:true})
    _min?: PostMinAggregateInput;

    @Field(() => PostMaxAggregateInput, {nullable:true})
    _max?: PostMaxAggregateInput;
}
