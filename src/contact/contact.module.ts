import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';

@Module({
  providers: [ContactService],
  controllers: [ContactController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Contact])
  ]
})
export class ContactModule { }
