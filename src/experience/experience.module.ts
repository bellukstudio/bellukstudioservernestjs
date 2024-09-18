import { Module } from '@nestjs/common';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExperienceSchema } from './schemas/experience.shema';
import { AuthModule } from 'src/auth/auth.module';


//* Define the ExperienceModule class as a module in the NestJS application
@Module({
  //* Import the MongooseModule to connect the Experience schema to the MongoDB collection
  imports: [
    //* Register the Experience model with its schema for database interaction
    AuthModule,
    MongooseModule.forFeature([{ name: 'Experience', schema: ExperienceSchema }])
  ],
  
  //* Declare the ExperienceController to handle HTTP requests related to experiences
  controllers: [ExperienceController],
  
  //* Declare the ExperienceService to handle business logic for managing experiences
  providers: [ExperienceService],
})
//* Export the ExperienceModule class
export class ExperienceModule { }