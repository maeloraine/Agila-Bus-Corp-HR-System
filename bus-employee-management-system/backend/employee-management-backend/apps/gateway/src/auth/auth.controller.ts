/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,) {}

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { employeeId: string; newPassword: string }) {
    const { employeeId, newPassword } = body;
    if (!employeeId || !newPassword) {
      throw new Error('Employee ID and new password are required');
    }
    return this.authService.resetPassword(employeeId, newPassword);
  }

  // @Post('logout')

}
