import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../../auth/auth.guard';
import { CommentController } from './comment.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    CommentController,
    CommentService,
    CommentResolver,
    PrismaService,
    AuthGuard,
  ],
})
export class CommentModule {}
