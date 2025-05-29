import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

//* Define the LoginDto class for validating user login data
export class LoginDto {
    
    //* User's email, must not be empty, must be a valid email, with a custom message for invalid emails
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter correct email' })
    readonly email: string;

    //* User's password, must not be empty, must be a string, and must have a minimum length of 6 characters
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;
}