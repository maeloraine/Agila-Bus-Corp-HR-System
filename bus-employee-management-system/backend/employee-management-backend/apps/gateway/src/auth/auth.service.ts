/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
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
        this.httpService.post(
          'http://localhost:4000/auth/login',
          credentials,
          {
            withCredentials: true,
            // @nestjs/axios supports 'responseType', but for headers you need to extract the whole response
          }
        )
      );
      // response has .data, .headers, .status
      return response;
    } catch (error) {
      throw new HttpException(
        error?.response?.data || 'Auth Service Error',
        error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verify(token: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'http://localhost:4000/auth/verify',
          {}, // No body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error?.response?.data || 'Auth Service Error',
        error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  async firstResetPassword(employeeId: string, newPassword: string) {
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

  async requestSecurityQuestion(email: string){
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://localhost:4000/auth/request-security-question', { email}),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error?.response?.data || 'Auth Service Error',
        error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateSecurityAnswer(email: string, answer: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://localhost:4000/auth/validate-security-answer', { email, answer }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error?.response?.data || 'Auth Service Error',
        error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
    
  async resetPassword(token: string, newPassword: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://localhost:4000/auth/reset-password', {
          token,
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

  async logout() {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://localhost:4000/auth/logout', {}, {
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
