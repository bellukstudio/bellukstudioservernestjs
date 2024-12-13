import { IsNotEmpty, IsString } from "class-validator";

export class CreateOverviewDto{
    @IsNotEmpty()
    @IsString()
    readonly overview:string
}