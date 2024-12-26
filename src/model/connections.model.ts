import { Connection } from "@/types/connections";
import mongoose, { Schema } from "mongoose";
const userSchema = new Schema<Connection>(
    {
        requester: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        requestee: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        isAccept: {
            type: Boolean,
            default: false
        }

    },
    {
        timestamps: true
    }
)

const ConnectionModel = (mongoose.models.Connection as mongoose.Model<Connection>) || (mongoose.model<Connection>("Connection", userSchema))

export { ConnectionModel };