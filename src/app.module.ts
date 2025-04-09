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

@Module({
  imports: [
    CommentModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
  ],
  controllers: [AuthController, CommentController],
  providers: [AuthService, PrismaService, JwtService, CommentService],
})
export class AppModule {}
