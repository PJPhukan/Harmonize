import { Document, Types } from "mongoose";

export interface Notification extends Document {
    owner: Types.ObjectId;
    message: string;
    postId: Types.ObjectId;
    requesterURL: string;
    requester: Types.ObjectId;

}