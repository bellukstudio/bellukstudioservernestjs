import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { SkillService } from './skill.service';
import { Query as ExpressQuery } from 'express-serve-static-core';
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


    @Get()
    async getAllSkill(@Query() query: ExpressQuery) {
        const skill = await this.skillService.findAll(query);
        return { message: "Successfully", skill: skill }
    }

    @Post('store')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async createSkill(
        @Body() skillDto: CreateSkillDto,
    ) {
        const skill = await this.skillService.create(skillDto)
        return { message: "Successfully", skill: skill }
    }

    @Get(':id')
    async getSkill(@Param('id') id: string) {
        const skill = await this.skillService.findById(id);
        return { message: "Successfully", skill: skill }
    }

    @Put(':id/update')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async updateSkill(
        @Param('id') id: string,
        @Body() skillDto: UpdateSkillDto
    ) {
        const skill = await this.skillService.updateById(id, skillDto);
        return { message: "Successfully", skill: skill }
    }

    @Delete(':id/delete')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async deleteSkill(@Param('id') id: string) {
        await this.skillService.deleteById(id);
        return { message: "Successfully delete skill" }
    }
}
