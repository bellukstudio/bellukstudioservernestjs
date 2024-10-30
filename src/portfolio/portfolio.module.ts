import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioSchema } from './schemas/portfolio.schema';

//* Define the PortfolioModule class as module in Nest js Application
@Module({
  imports:[
    //* Import Mongoose module and auth module,
    AuthModule,
    MongooseModule.forFeature([{name: 'Portfolio', schema: PortfolioSchema }])
  ],
  //* Declare PortofolioService
  providers: [PortfolioService],
  //* Declare PortfolioController
  controllers: [PortfolioController]
})
export class PortfolioModule {}
