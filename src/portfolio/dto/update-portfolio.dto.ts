import { IsEmpty, IsNotEmpty, IsString } from "class-validator"
import { User } from "src/auth/entities/user.entity"


export class UpdatePortfolioDto{
    @IsNotEmpty()
    @IsString()
    readonly title:string

    @IsNotEmpty()
    @IsString()
    readonly description:string

    @IsNotEmpty()
    @IsString()
    readonly urlPortfolio:string


    @IsEmpty({ message: 'You cannot pass user id' })
    readonly user: User
}