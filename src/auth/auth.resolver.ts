import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../lib/models/user.model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => [User])
  async getUsers() {
    return this.authService.findAll();
  }

  @Mutation(() => String)
  async login(@Args('loginDto') loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return result.access_token;
  }

  @Mutation(() => String)
  async register(@Args('loginDto') loginDto: LoginDto) {
    const result = await this.authService.register(loginDto);
    return result.access_token;
  }
}
