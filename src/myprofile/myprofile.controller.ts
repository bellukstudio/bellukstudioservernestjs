import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { MyprofileService } from './myprofile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';
import { Throttle } from '@nestjs/throttler';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('myprofile')
export class MyprofileController {
    constructor(private readonly myprofileService: MyprofileService) { }

    @Throttle({ default: { limit: 5, ttl: 60 } })
    @Get()
    async findAll(): Promise<Profile[]> {
        return this.myprofileService.findAll();
    }

    @Post()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
        return this.myprofileService.create(createProfileDto);
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Profile> {
        return this.myprofileService.findById(id);
    }

    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async updateById(
        @Param('id') id: string,
        @Body() profileData: Partial<Profile>,
    ): Promise<Profile> {
        return this.myprofileService.updateById(id, profileData);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async delete(@Param('id') id: string): Promise<void> {
        return this.myprofileService.delete(id);
    }

    @Put('upload/:id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
    async uploadPhoto(
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
        return this.myprofileService.uploadPhoto(id, file);
    }


    @Put('uploadBackground/:id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
    async uploadBackground(
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
        return this.myprofileService.uploadBackground(id, file);
    }
}
