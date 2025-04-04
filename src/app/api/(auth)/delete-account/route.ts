import { dbConnect } from "@/lib/dbConnection";
import { UserModel } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/helpers/ApiResponse";
import { decodeToken } from "@/helpers/authHelpers";
import { PostModel } from "@/model/post.model";
import { NotificationModel } from "@/model/notification.model";
import { ConnectionModel } from "@/model/connections.model";

export async function DELETE(request: NextRequest): Promise<NextResponse> {
    await dbConnect();
    try {
        // Decode Token to get User ID
        const tokenId = decodeToken(request);
        if (!tokenId) {
            return NextResponse.json({
                success: false,
                message: "Invalid or expired token.",
                statusCode: 401
            });
        }

        // Find User
        const user = await UserModel.findById(tokenId);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found.",
                statusCode: 404
            });
        }

        if (!user.isVerified) {
            return NextResponse.json({
                success: false,
                message: "User is not verified.",
                statusCode: 401
            });
        }

        // Delete all user-related data
        await PostModel.deleteMany({ owner: tokenId });
        await NotificationModel.deleteMany({ owner: tokenId });
        await ConnectionModel.deleteMany({
            $or: [{ requester: tokenId }, { requestee: tokenId }]
        });

        // Finally, delete the user account
        await UserModel.findByIdAndDelete(tokenId);

        // Response after deletion
        const response: ApiResponse = {
            success: true,
            message: "User and all related data deleted successfully",
            statusCode: 200
        };

        return NextResponse.json(response);
    } catch (err) {
        console.error("USER DELETE ERROR:", err);

        const response: ApiResponse = {
            success: false,
            message: "Failed to delete user",
            statusCode: 500
        };

        return NextResponse.json(response);
    }
}
