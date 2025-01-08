

import { ApiResponse } from "@/helpers/ApiResponse";
import { dbConnect } from "@/lib/dbConnection";
import { UserModel } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { comparePassword, decodeToken, encodeToken } from "@/helpers/authHelpers";

export async function GET(request: NextRequest, { params }: { params: { userId: string } }): Promise<NextResponse> {
    await dbConnect();
    try {
        const { userId } = await params;
        //decode payload from the request
        const tokenId = decodeToken(request);

        // Check if the user is authenticated and verified
        if (!tokenId) {
            return NextResponse.json({
                success: false,
                message: "Invalid or expired token.",
                statusCode: 401
            });
        }

        //check user exist or not by user id
        let user = await UserModel.findById(tokenId)?.select("-password")

        //check user is authenticated or not
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found.",
                statusCode: 404
            });
        }

        //check user is verified or not
        if (!user.isVerified) {
            return NextResponse.json({
                success: false,
                message: "User is not verified.",
                statusCode: 401
            });
        }


        let response: ApiResponse;

        const userDetails = await UserModel.findById(userId)?.select("-password")

        //check user is authenticated or not
        if (!userDetails) {
            return NextResponse.json({
                success: false,
                message: "User not found.",
                statusCode: 404
            });
        }

        //if user verified or credentials are valid then return user 
        response = {
            success: true,
            message: "Succesfully fetched user information",
            statusCode: 200,
            data: userDetails

        }

        // Create a response with the JSON data
        const jsonResponse = NextResponse.json(response);


        return jsonResponse;

    } catch (signInError) {
        const response: ApiResponse = {
            success: false,
            message: "Failed to Fetched user information",
            statusCode: 401
        }
        return NextResponse.json(response);
    }



}