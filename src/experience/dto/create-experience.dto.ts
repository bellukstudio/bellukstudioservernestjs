import { IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/auth/entities/user.entity";
// You don't need User validation here if it's passed from the request
export class CreateExperienceDto {

    @IsNotEmpty()
    @IsString()
    readonly jobtitle: string;

    @IsNotEmpty()
    @IsString()
    readonly company: string;

    @IsNotEmpty()
    @IsString()
    readonly startMonth: string;

    @IsNotEmpty()
    @IsString()
    readonly finishMonth: string;

    @IsOptional()
    @IsString()
    readonly overview: string;

    // Remove user validation here, assuming it's derived from the request
    @IsEmpty({ message: 'You cannot pass user id' })
    readonly user: User;  // Remove this validation if the user is being set in the controller/service
}
