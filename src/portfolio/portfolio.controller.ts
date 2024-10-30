import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { Query as ExpressQuery } from 'express-serve-static-core'
import { Portfolio } from './schemas/portfolio.schema';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreatePortfolioDto } from './dto/create-portoflio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Controller('portfolio')
export class PortfolioController {

    constructor(
        private portfolioService: PortfolioService
    ) { }

    @Get()
    async getAllPortfolio(@Query() query: ExpressQuery): Promise<Portfolio[]> {
        return this.portfolioService.findAll(query)
    }

    @Post()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async createPortfolio(
        @Body()
        portfolio: CreatePortfolioDto,
        @Req() req
    ): Promise<Portfolio> {
        return this.portfolioService.create(portfolio, req.user)
    }

    @Get(":id")
    async getPortfolio(
        @Param("id")
        id: string
    ): Promise<Portfolio> {
        return this.portfolioService.findById(id)
    }

    @Put(":id")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async updatePortfolio(
        @Param("id")
        id: string,
        @Body()
        portfolio: UpdatePortfolioDto
    ): Promise<Portfolio> {
        return this.portfolioService.updateById(id, portfolio)
    }

    @Delete(":id")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async deletePortfolio(
        @Param("id")
        id: string
    ): Promise<Portfolio> {
        return this.portfolioService.deleteById(id)
    }
}
