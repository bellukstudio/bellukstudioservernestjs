import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';


//* Define the User schema class with timestamps enabled
@Schema({
    timestamps: true //* Automatically manage createdAt and updatedAt fields
})
export class User extends Document  {

    //* Name of the user
    @Prop()
    name: string;

    //* Email of the user, must be unique, with a custom error message for duplicates
    @Prop({ unique: [true, 'Duplicate email entered'] })
    email: string;

    //* Password of the user
    @Prop()
    password: string;
}

//* Create a Mongoose schema from the User class
export const UserSchema = SchemaFactory.createForClass(User);