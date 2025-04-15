import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostDto {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  image_path: string;
}
