import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

// TODO: Body Field Form Create
export class CreateExperienceDto {
    @IsNotEmpty()
    @IsString()
    readonly jobtitle: String;

    @IsNotEmpty()
    @IsString()
    readonly company: String;

    @IsNotEmpty()
    @IsString()
    readonly startMonth: String;

    @IsNotEmpty()
    @IsString()
    readonly finishMonth: String;

    @IsOptional()
    @IsString()
    readonly overview: String;
}

//sample enum :     @IsEnum(Category,{message: 'Please enter correct category'})