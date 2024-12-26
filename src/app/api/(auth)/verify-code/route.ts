
import { ApiResponse } from "@/helpers/ApiResponse";
import { dbConnect } from "@/lib/dbConnection";
import { UserModel } from "@/model/user.model";
import { verifySchema } from "@/schemas/user.Schema";
import { NextResponse } from "next/server";


export async function POST(request: Request): Promise<NextResponse> {
    await dbConnect()
    try {
        // Extract verification and username from the request body
        const { username, code } = await request.json();

        //decodeusername
        const decodeUsername = decodeURIComponent(username);

        //validate verification code by zod
        const validationResult = verifySchema.safeParse({ code })
        let response: ApiResponse;


        //if code is not valid then return error message 
        if (!validationResult.success) {
            const varificationCodeErrorMessage = validationResult.error.format().code || []

            console.log("Print varification code error result ", validationResult)
            console.log("Print varification code error message", varificationCodeErrorMessage)

            response = {
                success: false,
                // message: varificationCodeErrorMessage.length>0?varificationCodeErrorMessage?.join(",\n"):"Please enter a valid verification code",//TODO: add correct error message
                message: "Please enter a valid verification code",
                statusCode: 400
            }
            return NextResponse.json(response);
        }

        //find user in the database by username
        const user = await UserModel.findOne({ username: decodeUsername });

        //if user not exist then return with a error message
        if (!user) {
            response = {
                success: false,
                message: "User not found",
                statusCode: 404
            }
            return NextResponse.json(response);
        }

        //verify verification code and check is time is out or not
        const isValidVerificationCode = user.verifyCode === code;
        const isCodeNoExpiry = new Date(user.verifyCodeExp) > new Date();

        //if verification code is not valid  then return error message
        if (!isValidVerificationCode) {
            response = {
                success: false,
                message: "Incorrect verification code",
                statusCode: 401
            }
            return NextResponse.json(response);
        }

        //if verification code  time is out then return error message
        if (!isCodeNoExpiry) {
            response = {
                success: false,
                message: "Verification code expired",
                statusCode: 401
            }
            return NextResponse.json(response);
        }



        //If user exit or varification code or expiry code is valid then  update the is varified and return the response with success message
        user.isVerified = true;
        await user.save();

        response = {
            success: true,
            message: "Verification is Successful",
            statusCode: 200,
            data: user
        }
        return NextResponse.json(response);

    } catch (verifyError) {
        console.error("Verification code error", verifyError);


        const response: ApiResponse = {
            success: false,
            message: "Failed to verify",
            statusCode: 500
        }
        return NextResponse.json(response);

    }


}