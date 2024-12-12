import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "../enums/role.enum";

//* Define the SignUpDto class for validating user registration data
export class SignUpDto {
    
    //* User's name, must not be empty and must be a string
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    //* User's email, must not be empty, must be a valid email, with a custom message for invalid emails
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter correct email' })
    readonly email: string;

    //* User's password, must not be empty, must be a string, and must have a minimum length of 6 characters
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;

    //* User's roles is optional
    @IsOptional()
    readonly role: Role;
}