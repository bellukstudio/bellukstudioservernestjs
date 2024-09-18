import { Module } from '@nestjs/common';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExperienceSchema } from './schemas/experience.shema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Experience', schema: ExperienceSchema }])],
  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule { }
