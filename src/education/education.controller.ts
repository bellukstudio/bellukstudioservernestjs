import { Controller, Get, Post, Param, Body, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { Education } from './entities/education.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('education')
export class EducationController {
    constructor(private readonly educationService: EducationService) { }

    // Retrieve all education records

    @Get()
    async findAll(@Query() query: ExpressQuery) {
        const education = await this.educationService.findAll(query);
        return { message: "Successfully", education: education }
    }

    // Create a new education record
    @Post('store')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async create(@Body() createEducationDto: CreateEducationDto) {
        const education = await this.educationService.create(createEducationDto);
        return { message: "Successfully", education: education }
    }

    // Find an education record by ID
    @Get(':id')
    async findById(@Param('id') id: string) {
        const education = await this.educationService.findById(id);
        return { message: "Successfully", education: education }
    }

    // Update an education record by ID
    @Put(':id/update')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async updateById(
        @Param('id') id: string,
        @Body() educationData: Partial<Education>,
    ) {
        const education = await this.educationService.updateById(id, educationData);
        return { message: "Successfully", education: education }
    }

    // Delete an education record by ID
    @Delete(':id/delete')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async delete(@Param('id') id: string) {
        await this.educationService.delete(id);
        return { message: "Successfully delete education" }
    }
}
