import { Document, Types } from "mongoose";

export interface Connection extends Document {
    requester: Types.ObjectId;// who requests send this connection
    requestee: Types.ObjectId;// who will accept this connection
    isAccept: Boolean;

}