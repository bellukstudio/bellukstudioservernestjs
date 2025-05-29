import { Module } from '@nestjs/common';
import { OverviewService } from './overview.service';
import { OverviewController } from './overview.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Overview } from './entities/overview.entity';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  providers: [OverviewService],
  controllers: [OverviewController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Overview]),
    FirebaseModule,
  ]
})
export class OverviewModule { }
