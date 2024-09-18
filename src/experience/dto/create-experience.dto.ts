import { IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "../../auth/schemas/user.schema";

// TODO: Body Field Form Create
//* Define the CreateExperienceDto class for validating experience creation data
export class CreateExperienceDto {

    //* Job title of the experience, must not be empty and must be a string
    @IsNotEmpty()
    @IsString()
    readonly jobtitle: string;

    //* Company name where the experience was gained, must not be empty and must be a string
    @IsNotEmpty()
    @IsString()
    readonly company: string;


    //* Starting month of the experience, must not be empty and must be a string
    @IsNotEmpty()
    @IsString()
    readonly startMonth: string;


    //* Finishing month of the experience, must not be empty and must be a string
    @IsNotEmpty()
    @IsString()
    readonly finishMonth: string;

    //* Optional overview or description of the experience, must be a string if provided
    @IsOptional()
    @IsString()
    readonly overview: string;

    //* Ensure that the user property is empty; if not, throw a custom error message
    @IsEmpty({ message: 'You cannot pass user id' })
    readonly user: User
}

//sample enum :     @IsEnum(Category,{message: 'Please enter correct category'})