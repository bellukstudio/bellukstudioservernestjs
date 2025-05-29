import { IsNotEmpty, IsString } from "class-validator";

export class UpdateSkillDto {
    @IsNotEmpty()
    @IsString()
    readonly skillName: string;

    @IsNotEmpty()
    @IsString()
    readonly level: string
}