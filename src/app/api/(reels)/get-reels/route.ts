import { ApiResponse } from "@/helpers/ApiResponse";
import { decodeToken } from "@/helpers/authHelpers";
import { ConnectionModel } from "@/model/connections.model";
import { PostModel } from "@/model/post.model";
import { UserModel } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Decode the token to get the current user ID
        const tokenId = decodeToken(request);

        if (!tokenId) {
            return NextResponse.json({
                success: false,
                message: "Invalid or expired token.",
                statusCode: 401
            });
        }

        // Find the authenticated user
        const user = await UserModel.findById(tokenId).select("-password");
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
        const matchQuery: any = {};
        matchQuery.type = {
            $regex: "video",
            $options: "i"
        }

        // Fetch all videos (type: "video")
        const videos = await PostModel.aggregate([
            { $match: matchQuery },
            {
                $lookup: {
                    from: "users", // Join with users collection
                    localField: "owner",
                    foreignField: "_id",
                    as: "ownerDetails",
                    pipeline: [
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                email: 1,
                                avatar: 1,
                                bio: 1,
                            }
                        },
                    ]
                },
            },
            {
                $unwind: "$ownerDetails"
            }, // Flatten the ownerDetails array


            {
                $lookup: {
                    from: "connections", // Join with connections
                    let: { ownerId: "$owner" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $or: [
                                        { $and: [{ $eq: ["$requester", tokenId] }, { $eq: ["$requestee", "$$ownerId"] }, { $eq: ["$isAccept", true] }] },
                                        { $and: [{ $eq: ["$requestee", tokenId] }, { $eq: ["$requester", "$$ownerId"] }, { $eq: ["$isAccept", true] }] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "connectionStatus"
                }
            },
            {
                $addFields: {
                    isConnected: { $gt: [{ $size: "$connectionStatus" }, 0] }
                }
            },
            {
                $project: {
                    _id: 1,
                    url: 1,
                    description: 1,
                    type: 1,
                    name: 1,
                    owner: 1,
                    ownerDetails: 1,
                    isConnected: 1 // true if connected, false otherwise
                }
            }
        ]);

        console.log("REELS :", videos) //TODO: remove after checked

        return NextResponse.json({
            success: true,
            message: "Fetched connected users' posts successfully.",
            statusCode: 200,
            data: videos
        });
    } catch (error) {
        console.error("Error fetching connected users' posts:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            statusCode: 500
        });
    }
}
