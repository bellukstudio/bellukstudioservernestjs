import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Overview } from './entities/overview.entity';
import { Query } from 'express-serve-static-core';
import { Repository } from 'typeorm';
import { CreateOverviewDto } from './dto/create-overview.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
@Injectable()
export class OverviewService {

    constructor(
        @InjectRepository(Overview)
        private readonly overviewRepository: Repository<Overview>,
        private readonly firebaseService: FirebaseService
    ) { }

    async findAll(query: Query): Promise<Overview[]> {
        const resPerPage = 10;

        const currentPage = Number(query.page) || 1;

        const skip = resPerPage * (currentPage - 1);

        return this.overviewRepository.find({
            skip,
            take: resPerPage
        });
    }

    async create(overviewDto: CreateOverviewDto): Promise<Overview> {
        const overview = this.overviewRepository.create(overviewDto);
        return this.overviewRepository.save(overview);
    }
    async findById(id: string): Promise<Overview> {
        const overview = await this.overviewRepository.findOne({
            where: {
                id
            }
        });

        if (!overview) {
            throw new HttpException({
                message: 'Overview not found',
                error: 'Not Found',
                statusCode: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND);
        }
        return overview;
    }
    async updateById(id: string, overview: Partial<Overview>): Promise<Overview> {
        const existingOverview = await this.overviewRepository.findOne({
            where: { id }
        });

        if (!existingOverview) {
            throw new HttpException({
                message: 'Overview not found',
                error: 'Not Found',
                statusCode: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND);
        }

        await this.overviewRepository.update(id, overview);

        return { ...existingOverview, ...overview };
    }
    async delete(id: string): Promise<void> {
        const result = await this.overviewRepository.delete(id);

        if (result.affected == 0) {
            throw new HttpException({
                message: 'Overview not found',
                error: 'Not Found',
                statusCode: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND);
        }
    }

    async uploadPhoto(id: string, file: Express.Multer.File) {
        // Correctly find the portfolio using the id
        const profile = await this.overviewRepository.findOne({ where: { id } });

        if (!profile) {
            throw new HttpException({
                message: 'Overview not found',
                error: 'Not Found',
                statusCode: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND);
        }

        // Upload the file to Firebase in the 'portfolio' folder
        const destination = `overview/${file.originalname}`;

        // Upload file to Firebase (assuming the buffer method is correct for your firebaseService)
        const url = await this.firebaseService.uploadFile(file.buffer, destination);

        // Save the URL to the 'thumbnail' field of the portfolio
        profile.photo = url;

        // Persist the changes to the database
        await this.overviewRepository.save(profile);

        return profile;
    }
}
