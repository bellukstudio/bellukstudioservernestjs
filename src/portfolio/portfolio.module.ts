import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { AuthModule } from 'src/auth/auth.module';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from './entities/portofolio.entity';

//* Define the PortfolioModule class as module in Nest js Application
@Module({
  imports: [
    //* Import Mongoose module and auth module,
    AuthModule,
    FirebaseModule,
    TypeOrmModule.forFeature([Portfolio])
  ],
  //* Declare PortofolioService
  providers: [PortfolioService],
  //* Declare PortfolioController
  controllers: [PortfolioController]
})
export class PortfolioModule { }
