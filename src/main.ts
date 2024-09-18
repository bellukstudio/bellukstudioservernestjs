import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

//* Import the NestFactory to create the application instance
//* Import the AppModule which contains the root module of the application
//* Import ValidationPipe for validating request payloads
async function bootstrap() {
  //* Create a NestJS application instance using AppModule
  const app = await NestFactory.create(AppModule);

  //* Apply a global validation pipe to automatically validate incoming requests
  app.useGlobalPipes(new ValidationPipe());

  //* Make the application listen on port 3000
  await app.listen(3012);
}

//* Call the bootstrap function to start the NestJS application
bootstrap();
