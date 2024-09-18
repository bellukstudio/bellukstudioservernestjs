import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { Experience } from './schemas/experience.shema';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Query as ExpressQuery } from 'express-serve-static-core'

@Controller('experiences')
export class ExperienceController {

    //* Constructor: to initiate the experience service
    constructor(
        private experienceService: ExperienceService
    ) { }

    //? Get all experiences with optional query parameters for filtering or pagination
    @Get()
    async getAllExperience(@Query() query: ExpressQuery): Promise<Experience[]> {
        return this.experienceService.findAll(query);
    }

    //? Create a new experience by providing the required data
    @Post()
    async createExperience(
        @Body()
        experience: CreateExperienceDto
    ): Promise<Experience> {
        return this.experienceService.create(experience);
    }

    //? Retrieve a specific experience by its unique ID
    @Get(':id')
    async getExperience(
        @Param('id')
        id: String
    ): Promise<Experience> {
        return this.experienceService.findById(id);
    }

    //? Update an existing experience by its ID and the new data to update
    @Put(':id')
    async updateExperience(
        @Param('id')
        id: String,
        @Body()
        experience: UpdateExperienceDto
    ): Promise<Experience> {
        return this.experienceService.updateById(id, experience);
    }

    //? Delete a specific experience by its ID
    @Delete(':id')
    async deleteExperience(
        @Param('id')
        id: String
    ): Promise<Experience> {
        return this.experienceService.deleteById(id);
    }
}

