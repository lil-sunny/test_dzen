import { Module } from '@nestjs/common';
import { PostService } from './posts.service';
import { PostResolver } from './posts.resolver';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../../auth/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [PostService, PostResolver, PrismaService, AuthGuard],
})
export class PostModule {}
