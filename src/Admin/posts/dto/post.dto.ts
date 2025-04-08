import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginDto {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  image_path: string;
}
