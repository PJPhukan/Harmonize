import { Connection } from "@/types/connections";
import mongoose, { Schema } from "mongoose";
const userSchema = new Schema<Connection>(
    {
        requester: { //from 
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        requestee: { //to user for connection
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