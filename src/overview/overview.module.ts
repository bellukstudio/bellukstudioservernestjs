import { Module } from '@nestjs/common';
import { OverviewService } from './overview.service';
import { OverviewController } from './overview.controller';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Overview } from './entities/overview.entity';

@Module({
  providers: [OverviewService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
  controllers: [OverviewController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Overview]),
  ]
})
export class OverviewModule { }
