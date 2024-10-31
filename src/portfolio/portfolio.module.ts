import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioSchema } from './schemas/portfolio.schema';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { FirebaseModule } from 'src/firebase/firebase.module';

//* Define the PortfolioModule class as module in Nest js Application
@Module({
  imports: [
    //* Import Mongoose module and auth module,
    AuthModule,
    FirebaseModule,
    MongooseModule.forFeature([{ name: 'Portfolio', schema: PortfolioSchema }])
  ],
  //* Declare PortofolioService
  providers: [PortfolioService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
  //* Declare PortfolioController
  controllers: [PortfolioController]
})
export class PortfolioModule { }
