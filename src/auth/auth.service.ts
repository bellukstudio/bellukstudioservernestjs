import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

//* Define the AuthService class to handle authentication-related operations
@Injectable()
export class AuthService {

    //* Constructor: Inject the User model and JwtService to interact with the database and handle JWTs
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    //* Handle user sign-up by creating a new user and returning a JWT token
    //? @param signUpDto: Data transfer object containing user registration details
    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { name, email, password, role } = signUpDto;

        //* Hash the user's password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            //* Create a new user document in the database with the hashed password
            const user = await this.userModel.create({
                name,
                email,
                password: hashedPassword,
                role
            });

            //* Generate a JWT token for the newly created user
            const token = this.jwtService.sign({ id: user._id });

            return { token };
        } catch (error) {
            if (error?.code === 11000) {
                throw new ConflictException('Duplicate Email Entered');
            }
        }
    }

    //* Handle user login by verifying credentials and returning a JWT token
    //? @param loginDto: Data transfer object containing login credentials
    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        //* Find the user by email address
        const user = await this.userModel.findOne({ email });

        //* Throw an exception if the user is not found
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        //* Compare the provided password with the hashed password stored in the database
        const isPasswordMatched = await bcrypt.compare(password, user.password);

        //* Throw an exception if the password does not match
        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or password');
        }

        //* Generate a JWT token for the authenticated user
        const token = this.jwtService.sign({ id: user._id });

        return { token };
    }
}
