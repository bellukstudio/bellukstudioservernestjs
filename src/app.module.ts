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
import { SkillModule } from './skill/skill.module';
import { Experience } from './experience/entities/experience.entity';
import { Portfolio } from './portfolio/entities/portofolio.entity';
import { EducationModule } from './education/education.module';
import { ContactModule } from './contact/contact.module';
import { OverviewModule } from './overview/overview.module';
import { MyprofileModule } from './myprofile/myprofile.module';
import { Skill } from './skill/entities/skill.entity';
import { Overview } from './overview/entities/overview.entity';
import { Profile } from './myprofile/entities/profile.entity';
import { Education } from './education/entities/education.entity';
import { Contact } from './contact/entities/contact.entity';
import { DataSource } from 'typeorm';
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
      autoLoadEntities: true,
      type: 'mysql',
      host: process.env.HOST,
      port: port,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [User, Experience, Portfolio, Skill, Overview, Profile, Education, Contact],
      synchronize: true,
      migrations: ['src/migrations/*.ts'],
    }),

    TypeOrmModule.forFeature([User, Experience, Portfolio, Skill, Overview, Profile, Education, Contact]),

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

  //* Declare the AppController to handle incoming requests
  controllers: [AppController],

  //* Declare the AppService to provide core application services
  providers: [AppService, FirebaseService],
})
//* Export the AppModule class
export class AppModule {
  constructor(private readonly dataSource: DataSource) { }
}