import { decodeToken } from "@/helpers/authHelpers";
import { ConnectionModel } from "@/model/connections.model";
import { NotificationModel } from "@/model/notification.model";
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

        if (!connection) {
            return NextResponse.json({
                success: false,
                message: "Connection request not found.",
                statusCode: 404,
            });
        }

        // Delete the connection request
        await connection.deleteOne();

        // Create a notification for the requester
        const notification = new NotificationModel({
            owner: requesteeId,
            message: `${tokenId.name} canceled the connection request.`,
            requester: tokenId,
            requesterURL: `/profile/${tokenId._id}`,
        });

        await notification.save();

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
