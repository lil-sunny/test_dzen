import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../lib/prisma/prisma.service'; // Імпортуємо PrismaService
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const payload = {
      username: user.username,
      user_id: user.id,
      avatar_path: user.avatar_path,
    };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async register(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const cryptPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        username: username,
        password: cryptPassword,
        avatar_path:
          'https://abrakadabra.fun/uploads/posts/2021-12/1640528661_1-abrakadabra-fun-p-serii-chelovek-na-avu-1.png',
      },
    });

    const payload = {
      username: newUser.username,
      user_id: newUser.id,
      avatar_path: newUser.avatar_path,
    };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return null;

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    return users;
  }
}
