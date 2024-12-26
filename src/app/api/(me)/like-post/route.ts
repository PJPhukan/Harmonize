import { ApiResponse } from "@/helpers/ApiResponse";
import { decodeToken } from "@/helpers/authHelpers";
import { LikeModel } from "@/model/like.model";
import { PostModel } from "@/model/post.model";
import { UserModel } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server"


// TODO:like a post 
export async function POST(request: NextRequest): Promise<NextResponse> {
    try {

        const { postId, owner } = await request.json();

        // TODO: No need to change upto next todo 
        //decode payload from the request
        const tokenId: string = decodeToken(request);

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
        // TODO: upto here 


        let newLike = await LikeModel.create({
            media: postId,
            likeUser: user._id,
            owner
        })

        if (!newLike) {
            return NextResponse.json({
                success: false,
                message: "Failed to create like post",
                statusCode: 401
            })
        }


        return NextResponse.json({
            success: true,
            message: "User successfully liked post",
            data: newLike,
            statusCode: 401

        });
    } catch (error) {
        console.error("Error while liking the post", error);
        const response: ApiResponse = {
            success: false,
            message: "Failed to like the post post",
            statusCode: 401
        }
        return NextResponse.json(response);

    }
}

//TODO:DELETE POST
export async function DELETE(request: NextRequest): Promise<NextResponse> {
    try {

        const { postId, owner } = await request.json();

        // TODO: No need to change upto next todo 
        //decode payload from the request
        const tokenId: string = decodeToken(request);

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
        // TODO: upto here 


        let newLike = await LikeModel.findOne({ likeUserId: user._id })

        if (!newLike) {
            return NextResponse.json({
                success: false,
                message: "User not like this post ",
                statusCode: 401
            })
        }


        return NextResponse.json({
            success: true,
            message: "User successfully disliked post",
            data: newLike,
            statusCode: 401

        });
    } catch (error) {
        console.error("Error while disliking the post", error);
        const response: ApiResponse = {
            success: false,
            message: "Failed to dislike the post post",
            statusCode: 401
        }
        return NextResponse.json(response);

    }
}


