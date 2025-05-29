import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; // Entitas User TypeORM
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>, // Repository TypeORM
        private readonly jwtService: JwtService,
    ) { }

    //* Handle user sign-up by creating a new user and returning a JWT token
    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { name, email, password, role } = signUpDto;

        //* Check if the email already exists
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            // Menggunakan HttpException untuk menyesuaikan format error
            throw new HttpException({
                message: 'Duplicate Email Entered',
                error: 'Conflict',
                statusCode: HttpStatus.CONFLICT,
            }, HttpStatus.CONFLICT);
        }

        //* Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10);

        //* Create a new user entity
        const newUser = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        //* Save the new user to the database
        const user = await this.userRepository.save(newUser);

        //* Generate a JWT token for the newly created user
        const token = this.jwtService.sign({ id: user.id });

        return { token };
    }

    //* Handle user login by verifying credentials and returning a JWT token
    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        //* Find the user by email address
        const user = await this.userRepository.findOne({ where: { email } });

        //* Throw an exception if the user is not found
        if (!user) {
            throw new HttpException({
                message: 'Invalid email or password',
                error: 'Unauthorized',
                statusCode: HttpStatus.UNAUTHORIZED,
            }, HttpStatus.UNAUTHORIZED);
        }

        //* Compare the provided password with the hashed password stored in the database
        const isPasswordMatched = await bcrypt.compare(password, user.password);

        //* Throw an exception if the password does not match
        if (!isPasswordMatched) {
            throw new HttpException({
                message: 'Invalid email or password',
                error: 'Unauthorized',
                statusCode: HttpStatus.UNAUTHORIZED,
            }, HttpStatus.UNAUTHORIZED);
        }

        //* Generate a JWT token for the authenticated user
        const token = this.jwtService.sign({ id: user.id });

        return { token };
    }
}
