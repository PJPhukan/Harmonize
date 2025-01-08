import { ApiResponse } from "@/helpers/ApiResponse";
import { decodeToken } from "@/helpers/authHelpers";
import { ConnectionModel } from "@/model/connections.model";
import { PostModel } from "@/model/post.model";
import { UserModel } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server"



//TODO:GET CONNECTED PEOPLE POST
export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Decode payload from the request
        const tokenId = decodeToken(request);

        // Check if the user is authenticated and verified
        if (!tokenId) {
            return NextResponse.json({
                success: false,
                message: "Invalid or expired token.",
                statusCode: 401
            });
        }

        // Check if the user exists and is verified
        const user = await UserModel.findById(tokenId)?.select("-password");
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
        const userGenres = user.genres || [];

        // Get all connected users (both requester and requestee)
        const connections = await ConnectionModel.find({
            $or: [{ requester: user._id }, { requestee: user._id }],
            isAccept: true,
        });

        const connectedUserIds = connections.map((conn) =>
            conn.requester.toString() === user._id.toString()
                ? conn.requestee
                : conn.requester
        );

        // Find suggested users with similar genres
        const suggestedUsers = await UserModel.aggregate([
            {
                $match: {
                    _id: { $nin: [user._id, ...connectedUserIds] }, // Exclude current user and connected users
                    genres: { $in: userGenres }, // Match genres
                },
            },
            { 
                $sample: { size: 10 } }, // Randomize results, return up to 10 users
            {
                $project: {
                    name: 1,
                    avatar: 1,
                    genres: 1,
                    bio: 1,
                },
            },
        ]);

        return NextResponse.json({
            success: true,
            message: "Suggested people fetched successfully.",
            statusCode: 200,
            data: suggestedUsers,
        });
    } catch (error) {
        console.error("Error fetching suggested people:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to fetch suggested people.",
            statusCode: 500,
        });
    }
}


