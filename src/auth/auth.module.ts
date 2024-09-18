import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';


//* Define the AuthModule class as a module in the NestJS application
@Module({
  //* Import the necessary modules
  imports: [
    //* Register Passport with the default strategy set to 'jwt' for authentication
    PassportModule.register({ defaultStrategy: 'jwt' }),

    //* Register the JwtModule asynchronously to configure JWT settings
    JwtModule.registerAsync({
      //* Inject the ConfigService to access environment variables
      inject: [ConfigService],

      //* Use a factory function to configure the JwtModule with dynamic values
      useFactory: (config: ConfigService) => {
        return {
          //* Retrieve the secret key for JWT from environment variables
          secret: config.get('JWT_SECRET'),

          //* Configure the expiration time for JWT tokens
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRED')
          }
        };
      }
    }),

    //* Register the Mongoose module with the 'User' model and its schema for database interaction
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],

  //* Declare the controller responsible for handling authentication-related requests
  controllers: [AuthController],

  //* Declare the AuthService and Jwt Strategy as a provider to handle the business logic for authentication
  providers: [AuthService, JwtStrategy],
  //* Export JwtStrategy and PassportModule to be used in other modules
  exports: [JwtStrategy, PassportModule]
})
//* Export the AuthModule class
export class AuthModule { }