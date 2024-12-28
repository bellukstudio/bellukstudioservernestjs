import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { MyprofileService } from './myprofile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('myprofile')
export class MyprofileController {
    constructor(private readonly myprofileService: MyprofileService) { }

    @Get()
    async findAll() {
        const profile = await this.myprofileService.findAll();
        return { message: "Successfully", profile: profile }
    }

    @Get('/getSingle')
    async getSingleOverview() {
        const profile = await this.myprofileService.getSingleData();
        return { message: "Successfully", profile: profile}
    }

    @Post('store')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async create(@Body() createProfileDto: CreateProfileDto) {
        const profile = await this.myprofileService.create(createProfileDto);
        return { message: "Successfully", profile: profile }
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const profile = await this.myprofileService.findById(id);
        return { message: "Successfully", profile: profile }
    }

    @Put(':id/update')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async updateById(
        @Param('id') id: string,
        @Body() profileData: Partial<Profile>,
    ) {
        const profile = await this.myprofileService.updateById(id, profileData);
        return { message: "Successfully", profile: profile }
    }

    @Delete(':id/delete')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async delete(@Param('id') id: string) {
        await this.myprofileService.delete(id);
        return { message: "Successfully" }
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
                    maxSize: 5 * 1024 * 1024,
                    message: 'File size must be less than 1MB',
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                }),
        )
        file: Express.Multer.File,
    ) {
        const photo = await this.myprofileService.uploadPhoto(id, file);
        return { message: "Successfully", photo: photo }
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
                    maxSize: 5 * 1024 * 1024,
                    message: 'File size must be less than 1MB',
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                }),
        )
        file: Express.Multer.File,
    ) {
        const photo = await this.myprofileService.uploadBackground(id, file);
        return { message: "Successfully", photo: photo }
    }
}
