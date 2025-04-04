import { dbConnect } from "@/lib/dbConnection";
import { UserModel } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/helpers/ApiResponse";
import { comparePassword, decodeToken } from "@/helpers/authHelpers";

export async function POST(request: NextRequest): Promise<NextResponse> {
    await dbConnect();
    try {
        const tokenId = decodeToken(request);
        const { skills } = await request.json();
        if (!tokenId) {
            return NextResponse.json({
                success: false,
                message: "Invalid or expired token.",
                statusCode: 401
            });
        }

        let user = await UserModel.findById(tokenId)
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

        user.skill = skills;
        user = await user.save()
        console.log("USER CREDENTIALS AFTER UPDATE PASSWORD:", user) //TODO: REMOVE 

        let response: ApiResponse;

        //If email send successfully , return a success message 
        response = {
            success: true,
            message: "User Password changed successfully",
            statusCode: 201,
            data: user
        }
        return NextResponse.json(response);
    } catch (err) {
        console.log("PASSWORD UPDATE ERROR" + err);

        let response: ApiResponse = {
            success: false,
            message: "Failed to Update password",
            statusCode: 401
        }
        return NextResponse.json(response);

    }


}