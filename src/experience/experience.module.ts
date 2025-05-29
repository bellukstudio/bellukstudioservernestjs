import { Module } from '@nestjs/common';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { User } from 'src/auth/entities/user.entity';


//* Define the ExperienceModule class as a module in the NestJS application
@Module({
  //* Import the MongooseModule to connect the Experience schema to the MongoDB collection
  imports: [
    //* Register the Experience model with its schema for database interaction
    AuthModule,
    TypeOrmModule.forFeature([Experience, User])
  ],

  //* Declare the ExperienceController to handle HTTP requests related to experiences
  controllers: [ExperienceController],

  //* Declare the ExperienceService to handle business logic for managing experiences
  providers: [ExperienceService],
})
//* Export the ExperienceModule class
export class ExperienceModule { }