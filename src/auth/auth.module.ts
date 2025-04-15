import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from '../lib/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'; // Стратегія для валідації JWT

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Секретний ключ для генерації JWT
      signOptions: { expiresIn: '1h' }, // Термін дії токену
    }),
  ],
  providers: [AuthService, AuthResolver, PrismaService, JwtStrategy],
})
export class AuthModule {}
