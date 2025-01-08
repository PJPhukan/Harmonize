
import { Post } from "@/types/post";
import mongoose, { Schema } from "mongoose";
const postSchema = new Schema<Post>(
    {
        type: {
            type: String,
        },
        url: {
            type: String,
        },
        description: {
            type: String,
            // required: [true, "Description is required"]
        },
        tag: {
            type: String,
        },
        name: {
            type: String
        },
        ownerName: {
            type: String
        },

        //Foreign key
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

const PostModel = (mongoose.models.Post as mongoose.Model<Post>) || (mongoose.model<Post>("Post", postSchema))

export { PostModel };