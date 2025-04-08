import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { Comment } from '../lib/models/comment.model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}
}