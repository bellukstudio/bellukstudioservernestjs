import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';

@Module({
  providers: [EducationService],
  controllers: [EducationController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Education])
  ]
})
export class EducationModule { }
