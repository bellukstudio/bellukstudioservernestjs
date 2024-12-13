import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/signup')
    async signUp(@Body() signUpDto: SignUpDto) {
        const { token } = await this.authService.signUp(signUpDto);

        return { message: "Successfully", token }
    }

    @Get('/login')
    async login(@Body() loginDto: LoginDto) {
        const { token } = await this.authService.login(loginDto);
        return { message: "Successfully", token }
    }
}
