import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MyprofileService } from './myprofile.service';
import { MyprofileController } from './myprofile.controller';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from 'src/auth/auth.module';
import { Profile } from './entities/profile.entity';

@Module({
  providers: [MyprofileService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
  controllers: [MyprofileController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Profile])
  ]
})
export class MyprofileModule { }
