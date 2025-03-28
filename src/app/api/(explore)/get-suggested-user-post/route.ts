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
        const suggestedUsers = await UserModel.find({
            _id: { $nin: [user._id, ...connectedUserIds] },
            genres: { $in: userGenres },
        }).select("_id");

        const suggestedUserIds = suggestedUsers.map((user) => user._id);

        // Fetch posts by suggested users
        const posts = await PostModel.aggregate([
            {
                $match: {
                    owner: { $in: suggestedUserIds },
                },
            },
            {
                $lookup: {
                    from: "likes", // Collection for likes
                    localField: "_id",
                    foreignField: "media",
                    as: "likes",
                },
            },
            {
                $addFields: {
                    totalLikes: { $size: "$likes" },
                },
            },
            {
                $lookup: {
                    from: "users", // Collection for users
                    localField: "owner",
                    foreignField: "_id",
                    as: "ownerDetails",
                },
            },
            {
                $unwind: "$ownerDetails", // Flatten the ownerDetails array
            },
            {
                $sort: {
                    createdAt: -1, // Newest first
                },
            },
            {
                $project: {
                    _id: 1,
                    url: 1,
                    description: 1,
                    owner: 1,
                    tag: 1,
                    totalLikes: 1,
                    type: 1,
                    name: 1,
                    ownerDetails: 1, // Include complete owner details
                },
            },
        ]);

        console.log("Connected user post :", posts)

        return NextResponse.json({
            success: true,
            message: "Suggested posts fetched successfully.",
            statusCode: 200,
            data: posts,
        });
    } catch (error) {
        console.error("Error fetching suggested posts:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to fetch suggested posts.",
            statusCode: 500,
        });
    }

}


