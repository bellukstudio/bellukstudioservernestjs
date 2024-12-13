import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/enums/role.enum';
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
    @Get()
    async getAllExperience(@Query() query: ExpressQuery) {
        const experience = await this.experienceService.findAll(query);
        return { message: "Successfully", experience: experience }
    }

    //* Handle POST requests to create a new experience
    //? @param experience: The data required to create a new experience
    @Post('store')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async createExperience(
        @Body() experience: CreateExperienceDto,
        @Req() req
    ) {
        const experienceData = await this.experienceService.create(experience, req.user);
        return { message: "Successfully", experience: experienceData }
    }

    //* Handle GET requests to retrieve a specific experience by its ID
    //? @param id: The unique ID of the experience to retrieve
    @Get(':id')
    async getExperience(
        @Param('id') id: string // Use `id` as string to match the route parameter type
    ) {
        const experience = await this.experienceService.findById(id); // Convert id to number for consistency
        return { message: "Successfully", experience: experience }
    }

    //* Handle PUT requests to update an existing experience by its ID and new data
    //? @param id: The ID of the experience to update
    //? @param experience: The new data to update the experience with
    @Put(':id/update')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async updateExperience(
        @Param('id') id: string,
        @Body() experience: UpdateExperienceDto
    ) {
        const experienceData = await this.experienceService.updateById(id, experience); // Convert id to number
        return { message: "Successfully", experience: experienceData }
    }

    //* Handle DELETE requests to remove a specific experience by its ID
    //? @param id: The ID of the experience to delete
    @Delete(':id/delete')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async deleteExperience(
        @Param('id') id: string
    ) { // The delete method in the service doesn't return the deleted entity
        await this.experienceService.deleteById(id); // Pass id as string as it’s accepted in the service
        return { message: "Successfully delete experience"}
    }
}
