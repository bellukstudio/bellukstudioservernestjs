import { Module } from '@nestjs/common';
import { OverviewService } from './overview.service';
import { OverviewController } from './overview.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Overview } from './entities/overview.entity';

@Module({
  providers: [OverviewService],
  controllers: [OverviewController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Overview]),
  ]
})
export class OverviewModule { }
