/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth-ms.service';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: 'apps/auth-ms/.env', }), // load .env
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRATION') },
      }),
    //   useFactory: (config: ConfigService) => {
    //   const secret = config.get<string>('JWT_SECRET');
    //   const expiresIn = config.get<string>('JWT_EXPIRATION');
    //   console.log('JWT_SECRET:', secret);
    //   console.log('JWT_EXPIRATION:', expiresIn);
    //   if (!secret) {
    //     throw new Error('JWT_SECRET is not defined in .env');
    //   }
    //   return {
    //     secret,
    //     signOptions: { expiresIn },
    //   };
    // },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthMsModule {}

