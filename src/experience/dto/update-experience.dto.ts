import { IsEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../../auth/entities/user.entity';

//* Define the UpdateExperienceDto class for validating experience update data
export class UpdateExperienceDto {

    //* Optional job title of the experience, must be a string if provided
    @IsOptional()
    @IsString()
    readonly jobtitle: string;

    //* Optional company name where the experience was gained, must be a string if provided
    @IsOptional()
    @IsString()
    readonly company: string;

    //* Optional starting month of the experience, must be a string if provided
    @IsOptional()
    @IsString()
    readonly startMonth: string;

    //* Optional finishing month of the experience, must be a string if provided
    @IsOptional()
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
