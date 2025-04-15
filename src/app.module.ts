import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './lib/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

import { CommentModule } from './Admin/comment/comment.module';
import { CommentController } from './Admin/comment/comment.controller';
import { CommentService } from './Admin/comment/comment.service';

import { PostModule } from './Admin/posts/posts.module';
import { PostController } from './Admin/posts/posts.controller';
import { PostService } from './Admin/posts/posts.service';

@Module({
  imports: [
    CommentModule,
    PostModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
  ],
  controllers: [AuthController, CommentController, PostController],
  providers: [
    AuthService,
    PrismaService,
    JwtService,
    CommentService,
    PostService,
  ],
})
export class AppModule {}
