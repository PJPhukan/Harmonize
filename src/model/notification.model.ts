
import { Notification } from "@/types/notification";
import mongoose, { Schema } from "mongoose";
const notificationSchema = new Schema<Notification>({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    requesterURL: {
        type: String
    },
    requester: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },


},
{
    timestamps: true
})

const NotificationModel = (mongoose.models.Notification as mongoose.Model<Notification>) || (mongoose.model<Notification>("Notification", notificationSchema))

export { NotificationModel };