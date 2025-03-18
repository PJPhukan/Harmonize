import { decodeToken } from "@/helpers/authHelpers";
import { ConnectionModel } from "@/model/connections.model";
import { UserModel } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Decode token and get user ID
        const tokenId = decodeToken(request);
        if (!tokenId) {
            return NextResponse.json({
                success: false,
                message: "Invalid or expired token.",
                statusCode: 401
            });
        }

        // Fetch user details
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



        //using aggregation pipeline 
        const connectedUser = await ConnectionModel.aggregate([
            {
                $match: {
                    $or: [
                        { requester: user._id, isAccept: true },
                        { requestee: user._id, isAccept: true }
                    ]
                }
            },
            {
                $addFields: {
                    connectedUserId: {
                        $cond: {
                            if: { $eq: ["$requester", user._id] },
                            then: "$requestee",
                            else: "$requester"
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "connectedUserId",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails"
            },
            {
                $project: {
                    _id: 1,
                    user_id: "$userDetails._id",
                    name: "$userDetails.name",
                    bio: "$userDetails.bio",
                    avatar: "$userDetails.avatar",
                    location: "$userDetails.location",
                    skill: "$userDetails.skill",
                    website: "$userDetails.website",
                    youtube: "$userDetails.youtube",
                    spotify: "$userDetails.spotify",
                    otherLink: "$userDetails.otherLink"
                }
            }
        ])


        return NextResponse.json({
            success: true,
            message: "Fetched connected users successfully.",
            statusCode: 200,
            data: connectedUser
        });
    } catch (error) {
        console.error("Error fetching connected users:", error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            statusCode: 500
        });
    }
}
