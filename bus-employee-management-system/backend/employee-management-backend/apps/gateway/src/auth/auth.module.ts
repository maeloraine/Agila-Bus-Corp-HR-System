/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios'; 
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        HttpModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
        })],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
