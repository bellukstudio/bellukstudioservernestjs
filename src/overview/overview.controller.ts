import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { OverviewService } from './overview.service';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateOverviewDto } from './dto/create-overview.dto';
import { UpdateOverviewDto } from './dto/update-overview.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
@Controller('overview')
export class OverviewController {
    constructor(
        private readonly overviewService: OverviewService
    ) { }


    @Get()
    async getAllOverview(@Query() query: ExpressQuery) {
        const overview = await this.overviewService.findAll(query);
        return { message: "Successfully", overview: overview }
    }

    @Post('store')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async createOverview(@Body() overviewDto: CreateOverviewDto) {
        const overview = await this.overviewService.create(overviewDto);
        return { message: "Successfully", overview: overview }
    }


    @Get(':id')
    async getSkill(@Param('id') id: string) {
        const overview = await this.overviewService.findById(id);
        return { message: "Successfully", overview: overview }
    }

    @Put(':id/update')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async updateSkill(
        @Param('id') id: string,
        @Body() overviewDto: UpdateOverviewDto
    ) {
        const overview = await this.overviewService.updateById(id, overviewDto);
        return { message: "Successfully", overview: overview }
    }

    @Delete(':id/delete')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async deleteSkill(@Param('id') id: string) {
        await this.overviewService.delete(id);
        return { message: "Successfully delete overview" }
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
                    maxSize: 5 * 1024 * 1024,
                    message: 'File size must be less than 1MB',
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                }),
        )
        file: Express.Multer.File,
    ) {
        const upload = await this.overviewService.uploadPhoto(id, file);
        return { message: "Successfully", photo: upload }
    }
}
