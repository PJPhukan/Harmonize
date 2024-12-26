import { UserModel } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Fetch all users from the database
        const users = await UserModel.find({}, "-password"); // Exclude password field for security

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
