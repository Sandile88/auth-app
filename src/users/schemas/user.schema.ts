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

    @Prop({ default: Date.now })
    lastLogin: Date;

    @Prop({ default: false})
    isVerified: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);