import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';

@Module({
  providers: [SkillService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Skill])
  ],
  controllers: [SkillController],
})
export class SkillModule { }
