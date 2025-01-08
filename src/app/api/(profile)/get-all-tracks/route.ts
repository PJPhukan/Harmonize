import { decodeToken } from "@/helpers/authHelpers";
import { PostModel } from "@/model/post.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Decode the token from the request (if using JWT for authentication)
        const tokenId = decodeToken(request);

        // Check if the user is authenticated
        if (!tokenId) {
            return NextResponse.json({
                success: false,
                message: "Invalid or expired token.",
                statusCode: 401,
            });
        }

        // Count the total number of posts (tracks) for the logged-in user where type includes 'audio'
        const totalTracks = await PostModel.countDocuments({
            owner: tokenId,
            type: { $regex: 'audio', $options: 'i' }, // 'i' for case-insensitive match
        });

        return NextResponse.json({
            success: true,
            message: "Total tracks fetched successfully.",
            statusCode: 200,
            data: { totalTracks },
        });
    } catch (error) {
        console.error("Error fetching total tracks for user:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to fetch total tracks.",
            statusCode: 500,
        });
    }
}
