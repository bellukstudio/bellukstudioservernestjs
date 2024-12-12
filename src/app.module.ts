import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExperienceModule } from './experience/experience.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseModule } from './firebase/firebase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
//1
//* Define the AppModule class as the root module in the NestJS application
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3306
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



    //* Import the ExperienceModule to manage experience-related functionality
    ExperienceModule,

    //* Import the AuthModule to manage authentication functionality
    AuthModule,


    //* Import PortofolioModule to manage portofolio functionality
    PortfolioModule,

    //* Import Firebase Module
    FirebaseModule,

    //* Type ORM
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: port,
      username: process.env.USERNAME, 
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [User],
      synchronize: true,
    }),

  ],

  //* Declare the AppController to handle incoming requests
  controllers: [AppController],

  //* Declare the AppService to provide core application services
  providers: [AppService, FirebaseService],
})
//* Export the AppModule class
export class AppModule { }