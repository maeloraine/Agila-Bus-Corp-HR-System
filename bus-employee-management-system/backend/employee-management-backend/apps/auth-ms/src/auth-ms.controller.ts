/* eslint-disable prettier/prettier */
// import { MessagePattern } from '@nestjs/microservices';
import { Controller, Post, Body, UnauthorizedException, Get } from '@nestjs/common';
import { AuthService } from './auth-ms.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    console.log('LOGIN ATTEMPT:', body);
    const user = await this.authService.validateUser(body.username, body.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }
  @Get('test')
  getTest() {
    return { message: 'Auth controller is working' };
}
}