import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    //* Constructor: Initialize the JwtStrategy with JWT extraction and secret key
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>, //* Inject the User repository to interact with the user data
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  //* Extract JWT from the Authorization header
            secretOrKey: process.env.JWT_SECRET,  //* Secret key for verifying JWT
        });
    }

    //* Validate the JWT payload by checking the existence of the user
    //? @param payload: JWT payload containing user information
    async validate(payload: { id: string }) {
        const { id } = payload;

        // Find user by ID using TypeORM repository
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new UnauthorizedException('Login first to access this endpoint'); //* Throw exception if user not found
        }

        return user;  //* Return user information if valid
    }
}
