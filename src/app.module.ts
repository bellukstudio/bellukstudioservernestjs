import { Module } from '@nestjs/common';
import { ExperienceModule } from './experience/experience.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseModule } from './firebase/firebase.module';
import { SkillModule } from './skill/skill.module';
import { EducationModule } from './education/education.module';
import { ContactModule } from './contact/contact.module';
import { OverviewModule } from './overview/overview.module';
import { MyprofileModule } from './myprofile/myprofile.module';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseApiInterceptor } from './core/interceptors/response-api.interceptor';
import { AllExceptionsFilter } from './core/filters/all-exception.filter';
//1
//* Define the AppModule class as the root module in the NestJS application
@Module({
  //* Import the necessary modules
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60,
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
    DatabaseModule,

    //* Import the SkillModule to manage authentication functionality
    SkillModule,
    //* Import the EducationModule to manage authentication functionality
    EducationModule,
    //* Import the ContactModule to manage authentication functionality
    ContactModule,
    //* Import the OverviewModule to manage authentication functionality
    OverviewModule,
    //* Import the MyprofileModule to manage authentication functionality
    MyprofileModule,

  ],


  //* Declare the AppService to provide core application services
  providers: [FirebaseService, 
    {
    provide: APP_INTERCEPTOR, useClass: ResponseApiInterceptor
    },
    {
      provide: APP_FILTER, useClass: AllExceptionsFilter
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
//* Export the AppModule class
export class AppModule { }