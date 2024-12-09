import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExperienceModule } from './experience/experience.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseModule } from './firebase/firebase.module';

//1
//* Define the AppModule class as the root module in the NestJS application
@Module({
  //* Import the necessary modules
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
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


    //* Import PortofolioModule to manage portofolio functionality
    PortfolioModule,

    //* Import Firebase Module
    FirebaseModule,

  ],

  //* Declare the AppController to handle incoming requests
  controllers: [AppController],

  //* Declare the AppService to provide core application services
  providers: [AppService, FirebaseService],
})
//* Export the AppModule class
export class AppModule { }