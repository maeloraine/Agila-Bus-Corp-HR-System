/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async login(credentials: LoginDto) {
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

  async resetPassword(employeeId: string, newPassword: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://localhost:4000/auth/first-password-reset', {
          employeeId,
          newPassword,
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
