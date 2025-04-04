import { decodeToken } from "@/helpers/authHelpers";
import { ConnectionModel } from "@/model/connections.model";
import { NotificationModel } from "@/model/notification.model";
import { UserModel } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest): Promise<NextResponse> {
    try {
        // Decode the token from the request (to get the user ID)
        const tokenId = decodeToken(request);

        const user = await UserModel.findById(tokenId);
        // Check if the user is authenticated
        if (!tokenId) {
            return NextResponse.json({
                success: false,
                message: "Invalid or expired token.",
                statusCode: 401,
            });
        }
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
                statusCode: 404,
            });
        }
        const { requesterId } = await request.json(); // Get the user ID of the requester
        console.log("Requester ID :", requesterId)
        const connection = await ConnectionModel.findOne({
            requester: requesterId,
            requestee: tokenId,
        });

        if (!connection) {
            return NextResponse.json({
                success: false,
                message: "Connection request not found.",
                statusCode: 404,
            });
        }

        if (connection.isAccept) {
            return NextResponse.json({
                success: false,
                message: "Connection request already accepted.",
                statusCode: 400,
            });
        }

        // Update the connection to accepted
        connection.isAccept = true;
        const connectionResponse = await connection.save();


        // Create a notification for the requester
        const notification = new NotificationModel({
            owner: requesterId,
            message: `${user.name} accepted your connection request.`,
            requester: tokenId,
            requesterURL: `${user.avatar}`,
        });

        await notification.save();
        if (connectionResponse.isAccept) {
            await NotificationModel.findOneAndDelete({ owner: tokenId })
        }

        return NextResponse.json({
            success: true,
            message: "Connection request accepted successfully.",
            statusCode: 200,
        });
    } catch (error) {
        console.error("Error accepting connection request: ", error);
        return NextResponse.json({
            success: false,
            message: "Failed to accept connection request.",
            statusCode: 500,
        });
    }
}
