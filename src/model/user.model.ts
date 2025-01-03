import { User } from "@/types/user.types";
import mongoose, { Schema } from "mongoose";
const userSchema = new Schema<User>({
    name: {
        type: String,
        required: [true, "Name is required"],
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
    skill: [{
            type: String,
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
    },
    location: {
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
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

},
{
    timestamps: true
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", userSchema))

export { UserModel };