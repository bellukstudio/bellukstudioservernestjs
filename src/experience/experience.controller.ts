import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { Experience } from './schemas/experience.shema';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Query as ExpressQuery } from 'express-serve-static-core'
import { AuthGuard } from '@nestjs/passport';

//* Define the ExperienceController to handle HTTP requests for experiences
@Controller('experiences')
export class ExperienceController {

    //* Constructor: Inject the ExperienceService to handle business logic
    constructor(
        private experienceService: ExperienceService
    ) { }

    //* Handle GET requests to retrieve all experiences with optional query parameters for filtering or pagination
    //? @param query: Optional query parameters for filtering and pagination
    @Get()
    async getAllExperience(@Query() query: ExpressQuery): Promise<Experience[]> {
        return this.experienceService.findAll(query);
    }

    //* Handle POST requests to create a new experience
    //? @param experience: The data required to create a new experience
    @Post()
    @UseGuards(AuthGuard())
    async createExperience(
        @Body()
        experience: CreateExperienceDto,
        @Req() req
    ): Promise<Experience> {
        return this.experienceService.create(experience, req.user);
    }

    //* Handle GET requests to retrieve a specific experience by its ID
    //? @param id: The unique ID of the experience to retrieve
    @Get(':id')
    async getExperience(
        @Param('id')
        id: string
    ): Promise<Experience> {
        return this.experienceService.findById(id);
    }

    //* Handle PUT requests to update an existing experience by its ID and new data
    //? @param id: The ID of the experience to update
    //? @param experience: The new data to update the experience with
    @Put(':id')
    @UseGuards(AuthGuard())
    async updateExperience(
        @Param('id')
        id: string,
        @Body()
        experience: UpdateExperienceDto
    ): Promise<Experience> {
        return this.experienceService.updateById(id, experience);
    }

    //* Handle DELETE requests to remove a specific experience by its ID
    //? @param id: The ID of the experience to delete
    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteExperience(
        @Param('id')
        id: string
    ): Promise<Experience> {
        return this.experienceService.deleteById(id);
    }
}