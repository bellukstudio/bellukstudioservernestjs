import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
    UseInterceptors,
    ParseFilePipeBuilder,
    HttpStatus,
    UploadedFile,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreatePortfolioDto } from './dto/create-portoflio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Portfolio } from './entities/portofolio.entity';

@Controller('portfolio')
export class PortfolioController {
    constructor(
        private readonly portfolioService: PortfolioService,
    ) {}

    // ✅ Get All Portfolios with Pagination & Search
    @Get()
    async getAllPortfolio(@Query() query: ExpressQuery) {
        const portfolio = await this.portfolioService.findAll(query);
        return { message: "Successfully", portfolio };
    }

    // ✅ Get All Portfolios without Pagination
    @Get('all')
    async getAllPortfolioWithoutPagination() {
        const portfolio = await this.portfolioService.findAllWithoutPagination();
        return { message: "Successfully", portfolio };
    }

    // ✅ Get Portfolio by ID
    @Get(':id')
    async getPortfolio(@Param('id') id: string) {
        const portfolio = await this.portfolioService.findById(id);
        return { message: "Successfully", portfolio };
    }

    // ✅ Create Portfolio (Admin Only)
    @Post('store')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async createPortfolio(
        @Body() portfolioDto: CreatePortfolioDto,
        @Req() req,
    ) {
        return this.portfolioService.create(portfolioDto, req.user);
    }

    // ✅ Update Portfolio by ID (Admin Only)
    @Put(':id/update')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async updatePortfolio(
        @Param('id') id: string,
        @Body() portfolioDto: UpdatePortfolioDto,
    ) {
        const portfolio = await this.portfolioService.updateById(id, portfolioDto);
        return { message: "Successfully", portfolio };
    }

    // ✅ Delete Portfolio by ID (Admin Only)
    @Delete(':id/delete')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async deletePortfolio(@Param('id') id: string) {
        await this.portfolioService.deleteById(id);
        return { message: "Successfully delete portfolio" };
    }

    // ✅ Upload Image for Portfolio (Admin Only)
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
                    maxSize: 1 * 1024 * 1024, // 1MB
                    message: 'File size must be less than 1MB',
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                }),
        )
        file: Express.Multer.File,
    ) {
        const upload = await this.portfolioService.uploadImage(id, file);
        return { message: "Successfully", photo: upload };
    }
}
