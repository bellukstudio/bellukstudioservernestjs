import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class FirebaseService {
    private readonly logger = new Logger(FirebaseService.name);

    constructor() {
        if (admin.apps.length === 0) {
            const serviceAccount = path.resolve(__dirname, '../../config/portofolio-2a917-firebase-adminsdk-vd2a7-b5a7f84207.json');

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                storageBucket: 'portofolio-2a917.appspot.com',
            });

            this.logger.log('Firebase app initialized');
        } else {
            this.logger.log('Firebase app already initialized');
        }
    }

    async uploadFile(fileBuffer: Buffer, destination: string): Promise<string> {
        try {
            const bucket = admin.storage().bucket();
            const file = bucket.file(destination);
            
            // Mengupload file dari buffer
            await file.save(fileBuffer, {
                contentType: 'image/jpeg', // Atur tipe konten sesuai kebutuhan
                public: true,
                metadata: {
                    cacheControl: 'public, max-age=31536000',
                },
            });
    
            const url = `https://storage.googleapis.com/${bucket.name}/${destination}`;
            return url;
        } catch (error) {
            this.logger.error('Error uploading file to Firebase Storage:', error);
            throw error;
        }
    }
    
}
