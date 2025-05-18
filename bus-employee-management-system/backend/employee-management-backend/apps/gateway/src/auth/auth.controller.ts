/* eslint-disable prettier/prettier */
// gateway/src/auth/app.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly httpService: HttpService) {}

  @Post('login')
  async login(@Body() credentials: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://localhost:4000/auth/login', credentials, {
          withCredentials: true,
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error?.response?.data || 'Auth Service Error',
        error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
