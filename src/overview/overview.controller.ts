import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { OverviewService } from './overview.service';
import { Throttle } from '@nestjs/throttler';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Overview } from './entities/overview.entity';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateOverviewDto } from './dto/create-overview.dto';
import { UpdateOverviewDto } from './dto/update-overview.dto';
@Controller('overview')
export class OverviewController {
    constructor(
        private readonly overviewService: OverviewService
    ) { }


    @Throttle({ default: { limit: 1, ttl: 2000 } })
    @Get()
    async getAllOverview(@Query() query: ExpressQuery): Promise<Overview[]> {
        return this.overviewService.findAll(query);
    }

    @Post()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async createOverview(@Body() overview: CreateOverviewDto): Promise<Overview> {
        return this.overviewService.create(overview);
    }


    @Get(':id')
    async getSkill(@Param('id') id: string) {
        return this.overviewService.findById(id);
    }

    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async updateSkill(
        @Param('id') id: string,
        @Body() overview: UpdateOverviewDto
    ): Promise<Overview> {
        return this.overviewService.updateById(id, overview);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async deleteSkill(@Param('id') id: string): Promise<void> {
        return this.overviewService.delete(id);
    }
}
