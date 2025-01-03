//steps for login user by the username or email and password
//1) extract the email and password from the request json
//2) check user is exist or not 
//3) if not of user exist then return response message with a error message
//4) if user exists then return response message with a success message

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
        let user = await UserModel.findOne({
            $or: [{ email }]
        })

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

        //check password is correct or not
        const checkPassword = await comparePassword({ password, hashedPassword: user.password });

        console.log("Checked user password")
        //if password is incorrect then return error
        if (!checkPassword) {
            response = {
                success: false,
                message: "Incorrect password",
                statusCode: 401,
            }
            return NextResponse.json(response);
        }

        //jwt token 
        const payload = {
            _id: user._id,
            email: user.email,
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
        //remove password from the user
        // user = await UserModel.findById(user._id).select("-password");

        //if user verified or credentials are valid then return user 
        response = {
            success: true,
            message: "Succesfully signed in",
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
            message: "Failed to sign in",
            statusCode: 401
        }
        return NextResponse.json(response);
    }



}