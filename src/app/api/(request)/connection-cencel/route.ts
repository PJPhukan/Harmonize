import { decodeToken } from "@/helpers/authHelpers";
import { ConnectionModel } from "@/model/connections.model";
import { NotificationModel } from "@/model/notification.model";
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

        const { requesteeId } = await request.json(); // Get the user ID of the requestee

        // Find the connection request from the user
        const connection = await ConnectionModel.findOne({
            requester: tokenId,
            requestee: requesteeId,
        });

        const notificationMessage = await NotificationModel.findOne({
            owner: requesteeId,
            requester: tokenId,
        });

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
        await notificationMessage?.deleteOne();
        

        return NextResponse.json({
            success: true,
            message: "Connection request canceled successfully.",
            statusCode: 200,
        });
    } catch (error) {
        console.error("Error canceling connection request: ", error);
        return NextResponse.json({
            success: false,
            message: "Failed to cancel connection request.",
            statusCode: 500,
        });
    }
}
