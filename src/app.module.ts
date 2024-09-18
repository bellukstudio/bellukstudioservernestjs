import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExperienceModule } from './experience/experience.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

//1
//* Define the AppModule class as the root module in the NestJS application
@Module({
  //* Import the necessary modules
  imports: [
    //* Load the ConfigModule to handle environment variables, specifying the .env file and making it globally accessible
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true, //* Ensures that ConfigModule is available throughout the entire application
    }),

    //* Connect to the MongoDB database using the URI from environment variables
    MongooseModule.forRoot(process.env.DB_URI),

    //* Import the ExperienceModule to manage experience-related functionality
    ExperienceModule,

    //* Import the AuthModule to manage authentication functionality
    AuthModule,
  ],
  
  //* Declare the AppController to handle incoming requests
  controllers: [AppController],
  
  //* Declare the AppService to provide core application services
  providers: [AppService],
})
//* Export the AppModule class
export class AppModule { }