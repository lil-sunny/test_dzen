import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../lib/prisma/prisma.service'; // Імпортуємо PrismaService
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';


