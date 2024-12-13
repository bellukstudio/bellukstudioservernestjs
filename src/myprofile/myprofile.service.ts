
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class MyprofileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
        private readonly firebaseService: FirebaseService

    ) { }

    async findAll(): Promise<Profile[]> {
        return this.profileRepository.find();
    }

    async create(createProfileDto: CreateProfileDto): Promise<Profile> {
        const profile = this.profileRepository.create(createProfileDto);
        return this.profileRepository.save(profile);
    }

    async findById(id: string): Promise<Profile> {
        const profile = await this.profileRepository.findOne({ where: { id } });

        if (!profile) {
            throw new NotFoundException('Profile not found');
        }
        return profile;
    }

    async updateById(id: string, profileData: Partial<Profile>): Promise<Profile> {
        const existingProfile = await this.profileRepository.findOne({ where: { id } });

        if (!existingProfile) {
            throw new NotFoundException('Profile not found');
        }

        await this.profileRepository.update(id, profileData);

        return { ...existingProfile, ...profileData };
    }

    async delete(id: string): Promise<void> {
        const result = await this.profileRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException('Profile not found');
        }
    }

    async uploadPhoto(id: string, file: Express.Multer.File) {
        // Correctly find the portfolio using the id
        const profile = await this.profileRepository.findOne({ where: { id } });

        if (!profile) {
            throw new NotFoundException('Profile not found.');
        }

        // Upload the file to Firebase in the 'portfolio' folder
        const destination = `profile/${file.originalname}`;

        // Upload file to Firebase (assuming the buffer method is correct for your firebaseService)
        const url = await this.firebaseService.uploadFile(file.buffer, destination);

        // Save the URL to the 'thumbnail' field of the portfolio
        profile.photo = url;

        // Persist the changes to the database
        await this.profileRepository.save(profile);

        return profile;
    }

    async uploadBackground(id: string, file: Express.Multer.File) {
        // Correctly find the portfolio using the id
        const profile = await this.profileRepository.findOne({ where: { id } });

        if (!profile) {
            throw new NotFoundException('Profile not found.');
        }

        // Upload the file to Firebase in the 'portfolio' folder
        const destination = `profile/${file.originalname}`;

        // Upload file to Firebase (assuming the buffer method is correct for your firebaseService)
        const url = await this.firebaseService.uploadFile(file.buffer, destination);

        // Save the URL to the 'thumbnail' field of the portfolio
        profile.background = url;

        // Persist the changes to the database
        await this.profileRepository.save(profile);

        return profile;
    }
}