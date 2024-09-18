import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";



//* Define the JwtStrategy class for JWT-based authentication
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    //* Constructor: Initialize the JwtStrategy with JWT extraction and secret key
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>, //* Inject the User model to interact with the user data
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //* Extract JWT from the Authorization header
            secretOrKey: process.env.JWT_SECRET, //* Secret key for verifying JWT
        });
    }

    //* Validate the JWT payload by checking the existence of the user
    //? @param payload: JWT payload containing user information
    async validate(payload: { id: string }) {
        const { id } = payload;

        const user = await this.userModel.findById(id);

        if (!user) {
            throw new UnauthorizedException('Login first to access this endpoint'); //* Throw exception if user not found
        }

        return user; //* Return user information if valid
    }
}