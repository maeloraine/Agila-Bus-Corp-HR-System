/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios'; 


@Module({
    imports: [HttpModule],
        // HttpModule,
        // JwtModule.register({
        //     secret: process.env.JWT_SECRET,
        //     signOptions: { expiresIn: '1h' },
        // })],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
