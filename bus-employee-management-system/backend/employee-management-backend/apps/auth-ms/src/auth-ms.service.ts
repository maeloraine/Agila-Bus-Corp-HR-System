/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client'

  const prisma = new PrismaClient();
@Injectable()
export class AuthService{
// export class AuthService implements OnModuleInit {
//HARDCODED CREDENTIALS
  // private readonly users = [
  //   {
  //     id: 1,
  //     username: 'admin123', // Combine role and employeeID (e.g., 'Admin_admin123')
  //     role: 'Admin',
  //     password: '',
  //   },
  //   {
  //     id: 2,
  //     username: 'hr123',
  //     role: 'HR Manager',
  //     password: '',
  //   },
  //   {
  //     id: 3,
  //     username: 'accountant123',
  //     role: 'Accountant',
  //     password: '',
  //   },
  // ];

  constructor(private readonly jwtService: JwtService) {}



  async validateUser(role: string, employeeId: string, passport: string): Promise<any> {
    const user = await prisma.user.findUnique({
      where: { employeeId} });
    if (user && user.role === role && await argon2.verify(user.password, passport)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async onModuleInit() {
  //   // Hash passwords for all users during module initialization
  //   for (const user of this.users) {
  //     user.password = await argon2.hash(user.username === 'admin123' ? 'Password@123' :
  //       user.username === 'hr123' ? 'Hr@12345' : 'Account@123', { type: argon2.argon2id });
  //   }
  // }

//HARDCODED VALIDATION CODE
  // async validateUser(role: string, employeeID: string, password: string): Promise<any> {
  //   // Construct username from role and employeeID (e.g., 'Admin_admin123')
  //   const user = await (async () => {
  //     for (const u of this.users) {
  //       if (u.username === employeeID && await argon2.verify(u.password, password)) {
  //         return u;
  //       }
  //     }
  //     return undefined;
  //   })();
  //   if (user) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  login(user: any) {
    const payload = { employeeId: user.employeeId, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}