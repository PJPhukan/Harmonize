import { ApiResponse } from "@/helpers/ApiResponse";
import { resetPassword } from "@/helpers/resetPasswordMail";
import { dbConnect } from "@/lib/dbConnection";
import { UserModel } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest): Promise<NextResponse> {
    await dbConnect();

    try {
        const { email } = await request.json();

        let user = await UserModel.findOne({ email });

        let response: ApiResponse;

        if (!user) {
            response = {
                success: false,
                message: "User not found",
                statusCode: 404,
            }
            return NextResponse.json(response);
        }

        //generate varification code 
        const verificationCode = Math.floor(Math.random() * 900000).toString();

        //set expiry date for the varification code(1 hours)
        let expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 1);

        user.verifyCode = verificationCode;
        user.verifyCodeExp = expiryDate;
        await user.save();
        //send email

        const emailResponse = await resetPassword({ email, username: user.name, otp: verificationCode })

        //if faild to send the email, return an error message

        if (!emailResponse.success) {
            response = {
                success: false,
                message: "Failed to send reset password otp",
                statusCode: 400
            }
            return NextResponse.json(response);
        }


        response = {
            success: true,
            message: "Please verify your reset password One time Password",
            statusCode: 201
        }
        return NextResponse.json(response);

    } catch (error) {
        console.log("Faild to reset password")
        return NextResponse.json({
            success: false,
            message: "Failed to reset password",
            statusCode: 500
        });
    }

}