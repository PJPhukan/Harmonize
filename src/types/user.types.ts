import { Document } from "mongoose";

export interface User {
    name: string;
    email: string;
    password: string;
    skill: [string];
    genres: [string];
    avatar: string;
    bio: string;
    location: {
        city: string,
        state: string,
        country: string
    }
    dob: Date;
    verifyCode: string;
    verifyCodeExp: Date;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;

}