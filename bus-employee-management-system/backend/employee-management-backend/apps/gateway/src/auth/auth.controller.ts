/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,) {}

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @Post('first-password-reset')
  async firstResetPassword(@Body() body: { employeeId: string; newPassword: string }) {
    const { employeeId, newPassword } = body;
    if (!employeeId || !newPassword) {
      throw new Error('Employee ID and new password are required');
    }
    return this.authService.firstResetPassword(employeeId, newPassword);
  }

  @Post('request-security-question')
  async requestSecurityQuestion(@Body('email') email: string) {
    return this.authService.requestSecurityQuestion(email);
  }
  
  @Post('validate-security-answer')
  async validateSecurityAnswer(@Body() body: { email: string; answer: string }) {
    return this.authService.validateSecurityAnswer(body.email, body.answer);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    const { token, newPassword } = body;
    if (!token || !newPassword) {
      throw new Error('Token and new password are required');
    }
    return this.authService.resetPassword(token, newPassword);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    const result = await this.authService.logout();
    return result;
  }
}
