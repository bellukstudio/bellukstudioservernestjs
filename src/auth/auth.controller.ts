import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {

    //* Constructor: Inject the AuthService to handle authentication logic
    constructor(
        private readonly authService: AuthService
    ) { }

    //* Handle POST requests to sign up a new user
    //? @param signUpDto: Data transfer object containing user registration details
    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(signUpDto);
    }

    //* Handle GET requests to log in a user (note: typically, login is handled with POST requests)
    //? @param loginDto: Data transfer object containing login credentials
    @Get('/login')
    login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }
}