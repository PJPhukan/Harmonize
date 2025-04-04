import { dbConnect } from "@/lib/dbConnection";
import { UserModel } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/helpers/ApiResponse";
import { decodeToken } from "@/helpers/authHelpers";

export async function POST(request: NextRequest): Promise<NextResponse> {
    await dbConnect();
    try {
        const tokenId = decodeToken(request);
        const { name, location, bio, day, month, year } = await request.json();
        if (!tokenId) {
            return NextResponse.json({
                success: false,
                message: "Invalid or expired token.",
                statusCode: 401
            });
        }

        let user = await UserModel.findById(tokenId)?.select("-password");
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
        const combineDate = (y: string, m: string, d: string): Date => {
            const year = parseInt(y);
            const month = parseInt(m);
            const day = parseInt(d);
            return new Date(year, month - 1, day);
        };

        if (name)
            user.name = name

        if (location)
            user.location = location

        if (bio)
            user.bio = bio;

        if (day && month && year) {
            const dob = combineDate(year, month, day)
            user.dob = dob
        }
        user = await user.save()




        console.log("USER CREDENTIALS AFTER UPDATE PROFILE INFORMATION:", user) //TODO: REMOVE 

        let response: ApiResponse;

        //If email send successfully , return a success message 
        response = {
            success: true,
            message: "User Profile information updated successfully",
            statusCode: 201,
            data: user
        }
        return NextResponse.json(response);
    } catch (err) {
        console.log("PROFILE INFORMATION UPDATE ERROR" + err);

        let response: ApiResponse = {
            success: false,
            message: "Failed to Update Profile Information",
            statusCode: 401
        }
        return NextResponse.json(response);

    }


}