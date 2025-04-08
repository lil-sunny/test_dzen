import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommentDto {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  image_path: string;
}
