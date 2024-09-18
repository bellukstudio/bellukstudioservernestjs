import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

// 2

//  TODO: schema table database
@Schema({
    timestamps: true
})
export class Experience {
    @Prop()
    jobtitle: String

    @Prop()
    company: String

    @Prop()
    startMonth: String

    @Prop()
    finishMonth: String

    @Prop()
    overview:String
}

export const  ExperienceSchema = SchemaFactory.createForClass(Experience)