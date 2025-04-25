import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../lib/prisma/prisma.service';
// import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface JwtPayload {
  username: string;
  user_id: number;
  avatar_path: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req; // Ось тут доступний request

    const authHeader = request.headers?.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token is missing');
    }

    const token = authHeader.replace('Bearer ', '');
    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.user_id },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      request['user'] = user; // Це можна використати в @Context() resolver'а

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token', err);
    }
  }
}
