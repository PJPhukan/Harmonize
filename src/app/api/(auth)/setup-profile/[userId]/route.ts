import { dbConnect } from "@/lib/dbConnection";
import { UserModel } from "@/model/user.model";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";
import { ApiResponse } from "@/helpers/ApiResponse";
import { varificationEmail } from "@/helpers/sendVarificationMail";
import { ZodError } from "zod";
import { ZodValidationError } from "@/exceptions/zod.exception";
import { isValidObjectId } from "mongoose";
export async function POST(request: Request, { params }: { params: { userId: string } }): Promise<NextResponse> {
    await dbConnect();
    try {
        const { userId } = await params;
        console.log(userId)


        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Invalid credentials",
                statusCode: 400
            });
        }
        //Extract user details from the request body
        const { name, location, bio, genres, skills, avatar, avatarURL, website, youtube, spotify, instragram, twitter, linkdin, discord } = await request.json();



        const objectId =  isValidObjectId(userId);
        //check if user already exists
        let user = await UserModel.findById(userId)

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
        let otherLink: string[] = [];
        if (instragram) otherLink.push(instragram);
        if (twitter) otherLink.push(twitter);
        if (linkdin) otherLink.push(linkdin);
        if (discord) otherLink.push(discord);


        user.name = name || "";
        user.skill = skills;
        user.location = location || "";
        user.genres = genres;
        user.bio = bio;
        user.avatar = avatarURL;
        user.website = website || "";
        user.youtube = youtube || "";
        user.spotify = spotify || "";
        user.otherLink = otherLink ? otherLink : [];

        user = await user.save()

        console.log("User :", user)

        let response: ApiResponse;

        //If email send successfully , return a success message 
        response = {
            success: true,
            message: "Successfully user setup profile",
            statusCode: 201,
            data: user
        }
        return NextResponse.json(response);
    } catch (signInError) {
        // Extract error message from the caught error
        const errorMessage = signInError instanceof Error ? signInError.message : "An unknown error occurred";
        console.log("Setup profile " + errorMessage);

        let response: ApiResponse = {
            success: false,
            message: errorMessage || "Failed to setup profile",
            statusCode: 401
        }
        if (signInError instanceof ZodError) {
            response.message = ZodValidationError
        }
        return NextResponse.json(response);

    }


}