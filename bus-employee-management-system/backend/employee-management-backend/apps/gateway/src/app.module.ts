/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller'; 
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4003,
        },
      },
    ]),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
