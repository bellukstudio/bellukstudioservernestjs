import { IsNotEmpty, IsString } from "class-validator";

export class UpdateOverviewDto {
    @IsNotEmpty()
    @IsString()
    readonly overview: string
}