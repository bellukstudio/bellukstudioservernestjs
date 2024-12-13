import { Controller, Get, Post, Param, Body, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { Education } from './entities/education.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Throttle } from '@nestjs/throttler';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('education')
export class EducationController {
    constructor(private readonly educationService: EducationService) { }

    // Retrieve all education records

    @Throttle({ default: { limit: 1, ttl: 2000 } })
    @Get()
    async findAll(@Query() query: ExpressQuery): Promise<Education[]> {
        return this.educationService.findAll(query);
    }

    // Create a new education record
    @Post()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async create(@Body() createEducationDto: CreateEducationDto): Promise<Education> {
        return this.educationService.create(createEducationDto);
    }

    // Find an education record by ID
    @Get(':id')
    async findById(@Param('id') id: string): Promise<Education> {
        return this.educationService.findById(id);
    }

    // Update an education record by ID
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async updateById(
        @Param('id') id: string,
        @Body() educationData: Partial<Education>,
    ): Promise<Education> {
        return this.educationService.updateById(id, educationData);
    }

    // Delete an education record by ID
    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async delete(@Param('id') id: string): Promise<void> {
        return this.educationService.delete(id);
    }
}
