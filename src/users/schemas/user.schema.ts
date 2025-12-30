import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

@Schema({ timestamps: true})
export class User {
    // _id: ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({ default: false})
    isVerified: boolean

     @Prop()
    verificationToken?: string;

    @Prop()
    resetPasswordToken?: string;

    @Prop()
    resetPasswordExpires?: Date;

    @Prop()
    lastLogin?: Date; //what does this ? mean

    @Prop({ default: true })
    isActive: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);