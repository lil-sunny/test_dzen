import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PostWhereInput } from './post-where.input';

@InputType()
export class PostScalarRelationFilter {

    @Field(() => PostWhereInput, {nullable:true})
    is?: PostWhereInput;

    @Field(() => PostWhereInput, {nullable:true})
    isNot?: PostWhereInput;
}
