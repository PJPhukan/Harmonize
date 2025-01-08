import { Document, Types } from "mongoose";

export interface User extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    skill: [string];
    genres: [string];
    avatar: string;
    bio: string;
    location: string;
    dob: Date;
    verifyCode: string;
    verifyCodeExp: Date;
    isVerified: boolean;

    createdAt: Date;
    updatedAt: Date;
    website: string;
    youtube: string;
    spotify: string;
    otherLink: string[]

}