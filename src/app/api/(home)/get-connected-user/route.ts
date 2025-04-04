import { ApiResponse } from "@/helpers/ApiResponse";
import { decodeToken } from "@/helpers/authHelpers";
import { ConnectionModel } from "@/model/connections.model";
import { PostModel } from "@/model/post.model";
import { UserModel } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server"



export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const tokenId = decodeToken(request);
        if (!tokenId) {
            return NextResponse.json({ success: false, message: "Invalid or expired token.", statusCode: 401 });
        }

        const user = await UserModel.findById(tokenId)?.select("-password");
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found.", statusCode: 404 });
        }

        if (!user.isVerified) {
            return NextResponse.json({ success: false, message: "User is not verified.", statusCode: 401 });
        }

        const connections = await ConnectionModel.find({
            $or: [
                { requester: user._id, isAccept: true },
                { requestee: user._id, isAccept: true }
            ]
        });

        const connectedUserIds = connections.map((conn) =>
            conn.requester.toString() === user._id.toString() ? conn.requestee : conn.requester
        );

        const posts = await PostModel.aggregate([
            { $match: { owner: { $in: connectedUserIds } } },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "media",
                    as: "likes"
                }
            },
            {
                $addFields: {
                    totalLikes: { $size: "$likes" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "ownerDetails"
                }
            },
            { $unwind: "$ownerDetails" },
            {
                $addFields: {
                    isConnected: { $in: ["$owner", connectedUserIds] } // Check if post owner is in the connected list
                }
            },
            { $sort: { createdAt: -1 } },
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
                    ownerDetails: 1,
                    isConnected: 1 // Include the connection status in response
                }
            }
        ]);

        return NextResponse.json({
            success: true,
            message: "Fetched connected users' posts successfully.",
            statusCode: 200,
            data: posts
        });
    } catch (error) {
        console.error("Error fetching connected users' posts:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error", statusCode: 500 });
    }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               