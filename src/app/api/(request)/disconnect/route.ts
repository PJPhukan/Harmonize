import { decodeToken } from "@/helpers/authHelpers";
import { ConnectionModel } from "@/model/connections.model";
import { UserModel } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest): Promise<NextResponse> {
    try {
        // Decode the token from the request (to get the user ID)
        const tokenId = decodeToken(request);

        // Check if the user is authenticated
        if (!tokenId) {
            return NextResponse.json({
                success: false,
                message: "Invalid or expired token.",
                statusCode: 401,
            });
        }

        const { connectionId } = await request.json(); // Get the connection id

        // Find the connection request from the user
        const connection = await ConnectionModel.findById(connectionId)

        const user = await UserModel.findById(tokenId)

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
                statusCode: 404,
            });
        }
        if (!connection) {
            return NextResponse.json({
                success: false,
                message: "Connection request not found.",
                statusCode: 404,
            });
        }

        // Delete the connection request
        await connection.deleteOne();


        return NextResponse.json({
            success: true,
            message: "Succesfully connection removed.",
            statusCode: 200,
        });
    } catch (error) {
        console.error("Error occured while removing connection ", error);
        return NextResponse.json({
            success: false,
            message: "Failed to remove connection",
            statusCode: 500,
        });
    }
}
