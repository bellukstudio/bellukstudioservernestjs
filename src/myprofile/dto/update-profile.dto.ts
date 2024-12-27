import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
    @IsNotEmpty()
    @IsString()
    fullname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    contact: string;

    @IsNotEmpty()
    @IsString()
    liveIn: string;

    @IsNotEmpty()
    @IsString()
    available: string;

    @IsNotEmpty()
    @IsString()
    degree: string;

    @IsOptional()
    @IsString()
    overview?: string;

    @IsNotEmpty()
    @IsDateString()
    birthOfDay: string;
}
