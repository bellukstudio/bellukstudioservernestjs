import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateContactDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsNotEmpty()
    message: string;
}
