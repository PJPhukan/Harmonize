import { dbConnect } from "@/lib/dbConnection";
import { UserModel } from "@/model/user.model";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";
import { ApiResponse } from "@/helpers/ApiResponse";
import { varificationEmail } from "@/helpers/sendVarificationMail";
import { ZodError } from "zod";
import { ZodValidationError } from "@/exceptions/zod.exception";
export async function POST(request: Request): Promise<NextResponse> {
    await dbConnect();
    try {

        //Extract user details from the request body
        const { name, email, password, day, month, year } = await request.json();

        const combineDate = (y: string, m: string, d: string): Date => {
            const year = parseInt(y);
            const month = parseInt(m);
            const day = parseInt(d);
            return new Date(year, month - 1, day);
        };
        const dob = combineDate(year, month, day)

        //check if user already exists
        const existingUser = await UserModel.findOne({ $or: [{ email }, { dob }] })


        //generate varification code 
        let verificationCode = Math.floor(Math.random() * 900000).toString();

        while (verificationCode.length !== 6) {
            verificationCode = Math.floor(Math.random() * 900000).toString();
        }

        //set expiry date for the varification code(1 hours)
        let expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 60);


        let response: ApiResponse;
        let user;
        if (existingUser) {
            if (existingUser.isVerified) {
                //If user already exists then send a message to the user 
                response = {
                    success: false,
                    message: "User already exists",
                    statusCode: 409
                }

                return NextResponse.json(response);
            }
            else {
                //update the user password and verification details
                const hashedPassword = await bcrypt.hash(password, 10);

                existingUser.password = hashedPassword;
                existingUser.verifyCode = verificationCode;
                existingUser.verifyCodeExp = expiryDate;
                existingUser.isVerified = false;

                await existingUser.save();

                //send varification email notification
                const emailResponse = await varificationEmail({ email: email, username: name, otp: verificationCode });

             
                //if faild to send the email, return an error message

                if (!emailResponse.success) {
                    response = {
                        success: false,
                        message: "Failed to send verification email",
                        statusCode: 400
                    }
                    return NextResponse.json(response);
                }

                response = {
                    success: true,
                    message: "User alredy sign in, please verify your account.",
                    statusCode: 201
                }

                return NextResponse.json(response);
            }
        }
        else {

            //hashed the password
            const hashedPassword = await bcrypt.hash(password, 10);


            //create a new user
            user = await UserModel.create({
                name,
                email,
                password: hashedPassword,
                dob,
                verifyCode: verificationCode,
                verifyCodeExp: expiryDate,
                isVerified: false
            });

            //check user successfully created or not
            if (!user) {
                response = {
                    success: false,
                    message: "Failed to create user",
                    statusCode: 401
                }
                return NextResponse.json(response);
            }
        }


        //send varification email notification
        const emailResponse = await varificationEmail({ email: email, username: name, otp: verificationCode });

        //if faild to send the email, return an error message

        if (!emailResponse.success) {
            response = {
                success: false,
                message: "Failed to send verification email",
                statusCode: 400
            }
            return NextResponse.json(response);
        }

        //If email send successfully , return a success message 
        response = {
            success: true,
            message: "User registered successfully. Please verify your email.",
            statusCode: 201
        }
        return NextResponse.json(response);
    } catch (signInError) {
        // Extract error message from the caught error
        const errorMessage = signInError instanceof Error ? signInError.message : "An unknown error occurred";
        console.log("Sign in error: " + errorMessage);

        let response: ApiResponse = {
            success: false,
            message: errorMessage || "Failed to sign up",
            statusCode: 401
        }
        if (signInError instanceof ZodError) {
            response.message = ZodValidationError
        }
        return NextResponse.json(response);

    }


}