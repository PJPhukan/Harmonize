import { decodeToken } from "@/helpers/authHelpers";
import { ConnectionModel } from "@/model/connections.model";
import { NotificationModel } from "@/model/notification.model";
import { UserModel } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
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

        // Check if both users exist
        const user = await UserModel.findById(tokenId);
        const requestee = await UserModel.findById(requesteeId);

        if (!user || !requestee) {
            return NextResponse.json({
                success: false,
                message: "One or both users not found.",
                statusCode: 404,
            });
        }

        // Check if a connection request already exists
        const existingConnection = await ConnectionModel.findOne({
            $or: [
                { requester: tokenId, requestee: requesteeId },
                { requester: requesteeId, requestee: tokenId },
            ],
        });

        if (existingConnection) {
            return NextResponse.json({
                success: false,
                message: "Connection request already exists or already accepted.",
                statusCode: 400,
            });
        }

        // Create a new connection request
        const newConnection = new ConnectionModel({
            requester: tokenId,
            requestee: requesteeId,
            isAccept: false,
        });

        await newConnection.save();

        // Create a notification for the requestee
        const notification = new NotificationModel({
            owner: requesteeId,
            message: `${user.name} sent you a connection request.`,
            requester: tokenId,
            requesterURL: `${user.avatar}`,
        });

        await notification.save();

        return NextResponse.json({
            success: true,
            message: "Connection request sent successfully.",
            statusCode: 201,
            data: newConnection
        });
    } catch (error) {
        console.error("Error sending connection request: ", error);
        return NextResponse.json({
            success: false,
            message: "Failed to send connection request.",
            statusCode: 500,
        });
    }
}
