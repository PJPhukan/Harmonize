import { User } from "@/types/user.types";
import mongoose, { Schema } from "mongoose";
const userSchema = new Schema<User>({
    name: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email address"
        ]
    },
    skill: [
        {
            type: String,
            required: [true, "Role is required"],
        }
    ],
    genres: [
        {
            type: String,
            //TODO: add required properties
        }
    ],
 
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    bio: {
        type: String,
        required: [true, "Bio is required"]
    },
    location: {
        city: {
            type: String,
            required: [true, "Please provide a correct address"]
        },
        state: {
            type: String,
            required: [true, "Please provide a correct address"]
        },
        country: {
            type: String,
            required: [true, "Please provide a correct address"]
        }
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"]
    },
    verifyCodeExp: {
        type: Date,
        required: [true, "Verify code expiry is required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    dob: {
        type: Date,

    },
    avatar: {
        type: String,
        default: "/images/avatar.png" //TODO:Add default avater image 
    }

    //TODO: Foreign key

})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", userSchema))

export { UserModel };