import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm'; // Import Like operator from TypeORM
import { Experience } from './entities/experience.entity';
import { User } from 'src/auth/entities/user.entity';
import { Query } from 'express-serve-static-core';
import { CreateExperienceDto } from './dto/create-experience.dto';
// 3
@Injectable()
export class ExperienceService {

    //* Constructor for injecting the Experience model schema
    constructor(
        //* Inject the Experience model to interact with the MongoDB collection
        @InjectRepository(User)
        private readonly experienceRepository: Repository<Experience>
    ) { }

    //* Retrieve all experiences with optional search keyword and pagination
    //? @param query: to retrieve query parameters like keyword and page number
    async findAll(query: Query): Promise<Experience[]> {

        //* Set the number of results per page
        const resPerPage = 10;

        //* Determine the current page, default to 1 if not specified
        const currentPage = Number(query.page) || 1;

        //* Calculate the number of documents to skip based on the current page
        const skip = resPerPage * (currentPage - 1);

        //* Build the keyword filter based on the 'jobtitle', case-insensitive search
        const keyword = query.keyword ? {
            jobTitle: Like(`%${query.keyword}%`)
        } : {}; // Use the object directly if no keyword is present

        return this.experienceRepository.find({
            where: keyword,  // Pass the object directly to `where`
            skip,
            take: resPerPage,
        });

    }

    //* Create a new experience document in the database
    //? @param experience: the experience data to be saved
    async create(experienceDto: CreateExperienceDto, user: User): Promise<Experience> {
        const experience = new Experience();

        // Map the fields from DTO to the entity
        experience.jobTitle = experienceDto.jobtitle;
        experience.company = experienceDto.company;
        experience.startMonth = experienceDto.startMonth;
        experience.finishMonth = experienceDto.finishMonth;
        experience.overview = experienceDto.overview;

        // Add user and timestamps
        experience.user = user;  // Set the user from the request (this assumes the user is authenticated)
        experience.createdAt = new Date();
        experience.updatedAt = new Date();

        // Save to the repository (database)
        return this.experienceRepository.save(experience);
    }

    //* Find an experience by its ID
    //? @param id: the ID of the experience to retrieve
    async findById(id: number): Promise<Experience> {

        //* Retrieve the experience document by ID
        const experience = await this.experienceRepository.findOne({
            where: {
                id
            } // Fixing the query structure for findOne
        });

        //* Throw an error if the experience is not found
        if (!experience) {
            throw new NotFoundException('Experience not found');
        }
        return experience;
    }

    //* Update an experience by its ID
    //? @param id: the ID of the experience to update
    //? @param experience: the updated experience data
    async updateById(id: number, experience: Partial<Experience>): Promise<Experience> {
        const existingExperience = await this.experienceRepository.findOne({ where: { id } });
        if (!existingExperience) {
            throw new NotFoundException('Experience not found.');
        }

        await this.experienceRepository.update(id, experience);
        return { ...existingExperience, ...experience };
    }

    //* Delete an experience by its ID
    //? @param id: the ID of the experience to delete
    async deleteById(id: number): Promise<void> {
        const result = await this.experienceRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Experience not found.');
        }
    }
}
