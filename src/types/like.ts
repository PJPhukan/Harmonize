import { Document, Types } from "mongoose";

export interface Like extends Document {
    media: Types.ObjectId;
    owner: Types.ObjectId;
    likeUser: Types.ObjectId;

}