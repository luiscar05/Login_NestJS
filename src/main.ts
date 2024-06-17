import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const frontendOrigin = configService.get<string>('FRONTEND_ORIGIN') || 'http://localhost:5173';

  app.enableCors({
      origin: frontendOrigin,
      credentials: true,
  });
 
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())
  await app.listen(3000);


}
bootstrap();
