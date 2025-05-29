import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateOverviewDto {
    @IsNotEmpty()
    @IsString()
    readonly overview: string

    @IsOptional()
    @IsString()
    urlGithub?: string;

    @IsOptional()
    @IsString()
    urlLinkedIn?: string;

    @IsNotEmpty()
    @IsString()
    readonly githubName: string

    @IsNotEmpty()
    @IsString()
    readonly linkedInName: string
}