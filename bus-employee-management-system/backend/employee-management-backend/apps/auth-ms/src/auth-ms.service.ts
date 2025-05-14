/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly user = {
    id: 1,
    username: 'admin',
    password: '',
  };

  constructor(private readonly jwtService: JwtService) {}

  async onModuleInit() {
    this.user.password = await argon2.hash('admin123', { type: argon2.argon2id });
  }
  async validateUser(username: string, password: string): Promise<any> {
    if (username === this.user.username && (await argon2.verify(this.user.password, password))) {
      const { password, ...result } = this.user;
      return result;
    }
    return null;
  }

  login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}