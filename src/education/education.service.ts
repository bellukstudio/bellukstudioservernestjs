import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';
import { Like, Repository } from 'typeorm';
import { CreateEducationDto } from './dto/create-education.dto';
import { Query } from 'express-serve-static-core';

@Injectable()
export class EducationService {
    constructor(
        @InjectRepository(Education)
        private readonly educationRepository: Repository<Education>,
    ) { }

    // Retrieve all education records
    async findAll(query: Query): Promise<Education[]> {
        const resPerPage = 10;

        const currentPage = Number(query.page) || 1;

        const skip = resPerPage * (currentPage - 1);

        const keyword = query.keyword ? {
            educationLevel: Like(`%${query.keyword}%`)
        } : {}; // Use the object directly if no keyword is present]

        return this.educationRepository.find({
            where: keyword,
            skip,
            take: resPerPage
        });
    }

    // Create a new education record
    async create(createEducationDto: CreateEducationDto): Promise<Education> {
        const education = this.educationRepository.create(createEducationDto);
        return this.educationRepository.save(education);
    }

    // Find education record by ID
    async findById(id: string): Promise<Education> {
        const education = await this.educationRepository.findOne({ where: { id } });

        if (!education) {
            throw new HttpException({
                message: 'Education not found',
                error: 'Not Found',
                statusCode: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND);
        }
        return education;
    }

    // Update education record by ID
    async updateById(id: string, educationData: Partial<Education>): Promise<Education> {
        const existingEducation = await this.educationRepository.findOne({ where: { id } });

        if (!existingEducation) {
            throw new HttpException({
                message: 'Education not found',
                error: 'Not Found',
                statusCode: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND);
        }

        await this.educationRepository.update(id, educationData);

        return { ...existingEducation, ...educationData };
    }

    // Delete education record by ID
    async delete(id: string): Promise<void> {
        const result = await this.educationRepository.delete(id);

        if (result.affected === 0) {
            throw new HttpException({
                message: 'Education not found',
                error: 'Not Found',
                statusCode: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND);
        }
    }
}
