import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';

@Module({
  providers: [SkillService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Skill])
  ],
  controllers: [SkillController],
})
export class SkillModule { }
