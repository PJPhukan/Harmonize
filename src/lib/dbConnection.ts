import mongoose from "mongoose"

import { ConnectionObject } from "@/types/dbConnectionObject"

const connection: ConnectionObject = {};


export const dbConnect = async (): Promise<void> => {
    if (connection.isConnected) {
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_DB_URI || " ")
        connection.isConnected = db.connections[0].readyState;
        console.log("Successfully database connected");
    } catch (error) {
        console.log("Database connection error")
        process.exit(1);
    }
}
