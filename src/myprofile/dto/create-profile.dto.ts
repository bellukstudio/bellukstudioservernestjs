import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
    @IsNotEmpty()
    @IsString()
    fullname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    contact: string;

    @IsOptional()
    @IsString()
    overview?: string;
}