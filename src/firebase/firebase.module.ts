import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService], // Export FirebaseService untuk digunakan di module lain
})
export class FirebaseModule {}
