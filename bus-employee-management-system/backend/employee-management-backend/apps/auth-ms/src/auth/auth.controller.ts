/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Controller, Post, Body, HttpCode, HttpStatus, Res, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from '../auth-ms.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { PrismaClient } from '@prisma/client'
import * as argon2 from 'argon2';

const prisma = new PrismaClient(); // <-- Only need one Prisma client

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateUser(loginDto.role, loginDto.employeeID, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { access_token } = this.authService.login(user);
    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 * 1000, // 1 hour
    });
    return { message: 'Login successful' };
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: { employeeId: string; role: string; password: string }) {
    const { employeeId, role, password } = body;

    // If user already exists
    const existing = await prisma.user.findUnique({ where: { employeeId } });
    if (existing) {
      throw new BadRequestException('User already exists');
    }

    // Hash the password and store user
    const hash = await argon2.hash(password, { type: argon2.argon2id });
    const user = await prisma.user.create({
      data: { employeeId, role, password: hash },
    });

    return { message: 'User registered successfully', user: { id: user.id, employeeID: user.employeeId, role: user.role } };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    return { message: 'Logged out successfully' };
  }
}
