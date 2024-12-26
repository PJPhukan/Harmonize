
import { Like } from "@/types/like";
import mongoose, { Schema } from "mongoose";
const likeSchema = new Schema<Like>({
    media: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    likeUser: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    //Foreign key
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

},
{
    timestamps: true
})

const LikeModel = (mongoose.models.Like as mongoose.Model<Like>) || (mongoose.model<Like>("User", likeSchema))

export { LikeModel };