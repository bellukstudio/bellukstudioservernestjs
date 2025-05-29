import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateEducationDto {
    @IsNotEmpty()
    @IsString()
    educationLevel: string;

    @IsNotEmpty()
    @IsString()
    institution: string;

    @IsOptional()
    @IsString()
    fieldOfStudy?: string;

    @IsNotEmpty()
    @IsDateString()
    startMonth: string;

    @IsNotEmpty()
    @IsDateString()
    finishMonth: string;
}
