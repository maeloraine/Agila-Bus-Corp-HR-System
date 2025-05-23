/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as cookie from 'cookie';
import { Observable } from 'rxjs';


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const cookies = request.headers.cookie ? cookie.parse(request.headers.cookie) : {};
        const token = cookies['jwt'];
        
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }
        try {
            const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            (request as any).user = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired JWT token');
        }
    }
}
