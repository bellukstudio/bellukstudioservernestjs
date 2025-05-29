// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import { User } from "../../auth/schemas/user.schema";
// import mongoose from "mongoose";

// // 2

// //  TODO: schema table database
// //* Define the Experience schema class with timestamps enabled
// @Schema({
//     timestamps: true //* Automatically manage createdAt and updatedAt fields
// })
// export class Experience {
//     //* Job title of the experience
//     @Prop()
//     jobtitle: string;

//     //* Company name where the experience was gained
//     @Prop()
//     company: string;

//     //* Starting month of the experience
//     @Prop()
//     startMonth: string;

//     //* Finishing month of the experience
//     @Prop()
//     finishMonth: string;

//     //* Overview or description of the experience
//     @Prop()
//     overview: string;

//     //* Reference to the current user; stores the user's ObjectId and links to the User model
//     @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
//     user: User
// }

// //* Create a Mongoose schema from the Experience class
// export const ExperienceSchema = SchemaFactory.createForClass(Experience);