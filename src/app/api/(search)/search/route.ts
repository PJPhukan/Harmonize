import { UserModel } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Extract query parameters
        const { searchParams } = new URL(request.url);
        const username = searchParams.get("username");

        // Construct search query
        const matchQuery: any = {};
        if (username) {
            matchQuery.name = { $regex: username, $options: "i" }; // Case-insensitive search
        }

        // Search users based on query parameters
        const users = await UserModel.aggregate([
            { $match: matchQuery }, // Filter users
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    bio: 1,
                    avatar: 1,
                },
            },
        ]);

        if (users.length == 0) {
            return NextResponse.json({
                success: true,
                message: "No user found",
                statusCode: 200,
                data: users,
            });
        }
        return NextResponse.json({
            success: true,
            message: "Users fetched successfully.",
            statusCode: 200,
            data: users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to fetch users.",
            statusCode: 500,
        });
    }
}
