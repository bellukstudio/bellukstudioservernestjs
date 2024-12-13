import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';

@Module({
  providers: [ContactService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
  controllers: [ContactController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Contact])
  ]
})
export class ContactModule { }
