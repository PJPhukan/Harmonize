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

        // Find connections
        const connections = await ConnectionModel.find({
            $or: [
                { requester: user._id, isAccept: true },
                { requestee: user._id, isAccept: true }
            ]
        });

        // Extract connected user IDs
        const connectedUserIds = connections.map((conn) =>
            conn.requester.toString() === user._id.toString()
                ? conn.requestee
                : conn.requester
        );

        // Fetch connected users' details
        const connectedUsers = await UserModel.find({ _id: { $in: connectedUserIds } })
            .select("name bio avatar location skill website youtube spotify otherLink")
            .lean();


        return NextResponse.json({
            success: true,
            message: "Fetched connected users successfully.",
            statusCode: 200,
            data: connectedUsers
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
