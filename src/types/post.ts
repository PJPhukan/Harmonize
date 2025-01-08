import { Document, Types } from "mongoose";

export interface Post extends Document {
    type: string;
    url: string;
    description: string;
    tag: string;
    name: string;
    ownerName: string;
    owner: Types.ObjectId

}