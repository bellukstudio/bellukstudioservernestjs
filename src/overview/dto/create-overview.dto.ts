import { IsNotEmpty, IsString } from "class-validator";

export class CreateOverviewDto {
    @IsNotEmpty()
    @IsString()
    readonly overview: string

    @IsNotEmpty()
    @IsString()
    urlGithub?: string;

    @IsNotEmpty()
    @IsString()
    urlLinkedIn?: string;

    @IsNotEmpty()
    @IsString()
    readonly githubName: string

    @IsNotEmpty()
    @IsString()
    readonly linkedInName: string
}