// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import exp from "constants";
// import mongoose from "mongoose";
// import { User } from "src/auth/schemas/user.schema";


// //* Define Portfolio Schema
// @Schema({
//     timestamps: true
// })
// export class Portfolio {
//     //* Title portfolio
//     @Prop()
//     title: string;

//     //* Description
//     @Prop()
//     description: string;

//     //* Url portfolio
//     @Prop()
//     urlPortfolio: string;

//     //* thumbnail
//     @Prop()
//     thumbnail?: string;
//     //* Reference to the current user; stores the user's ObjectId and links to the User model
//     @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
//     user: User
// }


// export const PortfolioSchema = SchemaFactory.createForClass(Portfolio)