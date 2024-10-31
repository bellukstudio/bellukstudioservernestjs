import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFiles, UseGuards, UseInterceptors, ParseFilePipeBuilder, HttpStatus, UploadedFile, } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { Query as ExpressQuery } from 'express-serve-static-core'
import { Portfolio } from './schemas/portfolio.schema';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreatePortfolioDto } from './dto/create-portoflio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Throttle } from '@nestjs/throttler';
import { memoryStorage } from 'multer';

@Controller('portfolio')
export class PortfolioController {

    constructor(
        private portfolioService: PortfolioService,
    ) { }

    @Throttle({ default: { limit: 1, ttl: 2000 } })
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

    @Put('upload/:id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
    async uploadImage(
        @Param('id') id: string,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: /(jpg|jpeg|png)$/,
                })
                .addMaxSizeValidator({
                    maxSize: 1 * 1024 * 1024,
                    message: 'File size must be less than 1MB',
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                }),
        )
        file: Express.Multer.File,
    ) {
        return this.portfolioService.uploadImage(id, file);
    }
}
