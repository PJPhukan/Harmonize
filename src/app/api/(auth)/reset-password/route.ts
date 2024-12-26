

import { ApiResponse } from "@/helpers/ApiResponse";
import { dbConnect } from "@/lib/dbConnection";
import { UserModel } from "@/model/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { comparePassword, encodeToken } from "@/helpers/authHelpers";

export async function POST(request: Request): Promise<NextResponse> {
    await dbConnect();
    try {
        // Extract user details from the request body 
        const { email, password } = await request.json();

        // Check if user exists
        let user = await UserModel.findOne({ email })

        let response: ApiResponse;

        //if user not found then return a not found error
        if (!user) {
            response = {
                success: false,
                message: "User not found",
                statusCode: 404
            }
            return NextResponse.json(response);
        }
        //check user is varified or not , if not varified then return error
        if (!user.isVerified) {
            response = {
                success: false,
                message: "User is not verified",
                statusCode: 401,
            }
            return NextResponse.json(response)
        }

        //set new password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        //jwt token 
        const payload = {
            _id: user._id,
            email: user.email,
            // username: user.username,
            // adharId: user.adharId
        }

        //generate token
        const token = encodeToken(payload);

        if (!token) {
            response = {
                success: false,
                message: "Failed to generate token",
                statusCode: 500
            }

            return NextResponse.json(response);
        }

        //if user verified or credentials are valid then return user 
        response = {
            success: true,
            message: "Succesfully reset password",
            statusCode: 200,
            data: user

        }

        // Create a response with the JSON data
        const jsonResponse = NextResponse.json(response);

        // Set the cookie on the response
        jsonResponse.cookies.set("token", token, { httpOnly: true });

        return jsonResponse;

    } catch (signInError) {
        const response: ApiResponse = {
            success: false,
            message: "Failed to reset password",
            statusCode: 401
        }
        return NextResponse.json(response);
    }



}