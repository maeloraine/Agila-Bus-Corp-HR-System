import { NestFactory } from '@nestjs/core';
import { HrServiceModule } from './hr-service.module';

async function bootstrap() {
  const app = await NestFactory.create(HrServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
