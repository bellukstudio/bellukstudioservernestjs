import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/enums/role.enum';
import { Throttle } from '@nestjs/throttler';
import { Experience } from './entities/experience.entity';

//* Define the ExperienceController to handle HTTP requests for experiences
@Controller('experiences')
export class ExperienceController {

    //* Constructor: Inject the ExperienceService to handle business logic
    constructor(
        private readonly experienceService: ExperienceService
    ) { }

    //* Handle GET requests to retrieve all experiences with optional query parameters for filtering or pagination
    //? @param query: Optional query parameters for filtering and pagination
    @Throttle({ default: { limit: 1, ttl: 2000 } })
    @Get()
    async getAllExperience(@Query() query: ExpressQuery): Promise<Experience[]> {
        return this.experienceService.findAll(query);
    }

    //* Handle POST requests to create a new experience
    //? @param experience: The data required to create a new experience
    @Post()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async createExperience(
        @Body() experience: CreateExperienceDto,
        @Req() req
    ): Promise<Experience> {
        return this.experienceService.create(experience, req.user);
    }

    //* Handle GET requests to retrieve a specific experience by its ID
    //? @param id: The unique ID of the experience to retrieve
    @Get(':id')
    async getExperience(
        @Param('id') id: number // Use `id` as string to match the route parameter type
    ): Promise<Experience> {
        return this.experienceService.findById(id); // Convert id to number for consistency
    }

    //* Handle PUT requests to update an existing experience by its ID and new data
    //? @param id: The ID of the experience to update
    //? @param experience: The new data to update the experience with
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async updateExperience(
        @Param('id') id: number,
        @Body() experience: UpdateExperienceDto
    ): Promise<Experience> {
        return this.experienceService.updateById(id, experience); // Convert id to number
    }

    //* Handle DELETE requests to remove a specific experience by its ID
    //? @param id: The ID of the experience to delete
    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async deleteExperience(
        @Param('id') id: number
    ): Promise<void> { // The delete method in the service doesn't return the deleted entity
        return this.experienceService.deleteById(id); // Pass id as string as it’s accepted in the service
    }
}
