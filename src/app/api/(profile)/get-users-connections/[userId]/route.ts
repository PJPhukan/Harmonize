import { decodeToken } from "@/helpers/authHelpers";
import { ConnectionModel } from "@/model/connections.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { userId: string } }): Promise<NextResponse> {
    try {
        // Decode token to get the authenticated user's ID
        const tokenId = decodeToken(request);
        const { userId } = params;

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Invalid user credentials",
                statusCode: 401,
            });
        }

        if (!tokenId) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized access.",
                statusCode: 401,
            });
        }

        const totalConnections = await ConnectionModel.countDocuments({
            $and: [
                { isAccept: true },
                {
                    $or: [
                        { requester: userId },
                        { requestee: userId },
                    ],
                },
            ],
        });

        return NextResponse.json({
            success: true,
            message: "Total connections fetched successfully.",
            statusCode: 200,
            data: {
                totalConnections,
            },
        });
    } catch (error) {
        console.error("Error fetching total connections:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to fetch total connections.",
            statusCode: 500,
        });
    }
}
