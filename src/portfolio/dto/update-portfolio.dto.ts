import { IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { User } from "src/auth/entities/user.entity"


export class UpdatePortfolioDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string

    @IsNotEmpty()
    @IsString()
    readonly description: string

    @IsNotEmpty()
    @IsString()
    readonly urlPortfolio: string

    @IsOptional()
    @IsString()
    readonly urlGithub: string

    @IsEmpty({ message: 'You cannot pass user id' })
    readonly user: User
}