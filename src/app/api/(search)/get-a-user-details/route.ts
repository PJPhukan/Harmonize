import { UserModel } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Extract user ID from the query parameters
        const userId = request.nextUrl.searchParams.get("userId");

        // Validate userId
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "User ID is required.",
                statusCode: 400,
            });
        }

        // Fetch the user by ID
        const user = await UserModel.findById(userId, "-password"); // Exclude password for security

        // Check if the user exists
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found.",
                statusCode: 404,
            });
        }

        return NextResponse.json({
            success: true,
            message: "User fetched successfully.",
            statusCode: 200,
            data: user,
        });
    } catch (error) {
        console.error("Error fetching user details:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to fetch user details.",
            statusCode: 500,
        });
    }
}
