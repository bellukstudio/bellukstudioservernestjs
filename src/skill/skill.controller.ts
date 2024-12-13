import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { SkillService } from './skill.service';
import { Throttle } from '@nestjs/throttler';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Skill } from './entities/skill.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
@Controller('skill')
export class SkillController {

    constructor(
        private readonly skillService: SkillService
    ) {
    }


    @Throttle({ default: { limit: 1, ttl: 2000 } })
    @Get()
    async getAllSkill(@Query() query: ExpressQuery): Promise<Skill[]> {
        return this.skillService.findAll(query);
    }

    @Post()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async createSkill(
        @Body() skill: CreateSkillDto,
    ): Promise<Skill> {
        return this.skillService.create(skill)
    }

    @Get(':id')
    async getSkill(@Param('id') id: string) {
        return this.skillService.findById(id);
    }

    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async updateSkill(
        @Param('id') id: string,
        @Body() skill: UpdateSkillDto
    ): Promise<Skill> {
        return this.skillService.updateById(id, skill);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async deleteSkill(@Param('id') id: string): Promise<void> {
        return this.skillService.deleteById(id);
    }
}
