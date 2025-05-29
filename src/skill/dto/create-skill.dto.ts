import { IsNotEmpty, IsString } from "class-validator";

export class CreateSkillDto {
    @IsNotEmpty()
    @IsString()
    readonly skillName: string;

    @IsNotEmpty()
    @IsString()
    readonly level: string
}