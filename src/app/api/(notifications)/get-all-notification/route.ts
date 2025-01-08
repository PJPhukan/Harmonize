import { ApiResponse } from "@/helpers/ApiResponse";
import { decodeToken } from "@/helpers/authHelpers";
import { NotificationModel } from "@/model/notification.model";
import { PostModel } from "@/model/post.model";
import { UserModel } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server"



//TODO:GET ALL POST
export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Decode payload from the request
        const tokenId = decodeToken(request);

        // Check if the user is authenticated and verified
        if (!tokenId) {
            return NextResponse.json({
                success: false,
                message: "Invalid or expired token.",
                statusCode: 401,
            });
        }

        // Check if the user exists and is verified
        const user = await UserModel.findById(tokenId)?.select("-password");
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found.",
                statusCode: 404,
            });
        }

        if (!user.isVerified) {
            return NextResponse.json({
                success: false,
                message: "User is not verified.",
                statusCode: 401,
            });
        }

        //get all user notifications    
        const notifications = await NotificationModel.find({ owner: tokenId }).sort({ createdAt: -1 })
        if (notifications.length > 0) {
            return NextResponse.json({
                success: true,
                message: "Fetched notifications successfully.",
                statusCode: 200,
                data: notifications,
            });
        } else if (notifications.length == 0) {
            return NextResponse.json({
                success: true,
                message: "No notifications found.",
                statusCode: 200,
                data: []
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "No notifications found.",
                statusCode: 500,
                data: null,
            });
        }
    } catch (error) {
        console.error("Error while fetching posts: ", error);
        return NextResponse.json({
            success: false,
            message: "Failed to fetch posts.",
            statusCode: 500,
        });
    }
}


