import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors, ParseFilePipeBuilder, HttpStatus, UploadedFile, } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { Query as ExpressQuery } from 'express-serve-static-core'
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreatePortfolioDto } from './dto/create-portoflio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('portfolio')
export class PortfolioController {

    constructor(
        private readonly portfolioService: PortfolioService,
    ) { }

    @Get()
    async getAllPortfolio(@Query() query: ExpressQuery) {
        const portfolio = await this.portfolioService.findAll(query)
        return { message: "Successfully", portfolio: portfolio }
    }

    @Post('store')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async createPortfolio(
        @Body()
        portfolioDto: CreatePortfolioDto,
        @Req() req
    ) {
        const portfolio = await this.portfolioService.create(portfolioDto, req.user)
        return { message: "Successfully", portfolio: portfolio }
    }

    @Get(":id")
    async getPortfolio(
        @Param("id")
        id: string
    ) {
        const portfolio = await this.portfolioService.findById(id)
        return { message: "Successfully", portfolio: portfolio }
    }

    @Put(":id/update")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async updatePortfolio(
        @Param("id")
        id: string,
        @Body()
        portfolioDto: UpdatePortfolioDto
    ) {
        const portfolio = await this.portfolioService.updateById(id, portfolioDto)
        return { message: "Successfully", portfolio: portfolio }
    }

    @Delete(":id/delete")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async deletePortfolio(
        @Param("id")
        id: string
    ) {
        await this.portfolioService.deleteById(id)
        return { message: "Successfully delete portfolio" }
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
        const upload = await this.portfolioService.uploadImage(id, file);
        return { message: "Successfully", photo: upload }
    }
}
