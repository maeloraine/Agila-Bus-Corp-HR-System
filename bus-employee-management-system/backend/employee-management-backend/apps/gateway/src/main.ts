/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
// Handle the Promise explicitly:
bootstrap().catch(err => {
  console.error('Failed to start the app:', err);
  process.exit(1);
});