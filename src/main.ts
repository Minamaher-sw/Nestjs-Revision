import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { abortOnError: false });
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  await app.listen(process.env.PORT ?? 3000, "0.0.0.0", () => {
    console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
  });
}
bootstrap();
