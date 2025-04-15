import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterDto {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  re_password: string;
}
