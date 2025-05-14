/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
// import { MessagePattern } from '@nestjs/microservices';
import { Controller, Post, Body, UnauthorizedException, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth-ms.service';

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
  @UseGuards(AuthGuard('jwt'))
  @Get('protected')
  getProtected(@Request() req) {
    return {
      message: 'You have accessed a protected route!',
      user: req.user,
    };
  }
}

