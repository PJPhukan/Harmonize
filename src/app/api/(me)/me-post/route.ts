import { ApiResponse } from "@/helpers/ApiResponse";
import { decodeToken } from "@/helpers/authHelpers";
import { PostModel } from "@/model/post.model";
import { UserModel } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server"


// TODO:upload a post 
export async function POST(request: NextRequest): Promise<NextResponse> {
    try {

        const { type, postURL, post, description, tag, name } = await request.json();


        console.log("Post :", post)

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

        console.log(user.name)
        let newPost = await PostModel.create({
            type: type || "",
            url: postURL, description,
            tag: tag || "",
            name,
            ownerName: user.name,
            owner: user._id
        })

        if (!newPost) {
            return NextResponse.json({
                success: false,
                message: "Failed to create a new post",
                statusCode: 401
            })
        }

        console.log("New post ,", newPost)
        return NextResponse.json({
            success: true,
            message: "Post created successfully",
            data: newPost,
            statusCode: 401

        });
    } catch (error) {
        console.error("Error while creating a new post", error);
        const response: ApiResponse = {
            success: false,
            message: "Failed to create a new post",
            statusCode: 401
        }
        return NextResponse.json(response);

    }
}

//TODO:DELETE POST
export async function DELETE(request: NextRequest): Promise<NextResponse> {
    try {

        const { postId } = await request.json();


        // TODO: No need to change upto next todo 
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
        // TODO: upto here 


        let newPost = await PostModel.findByIdAndDelete(postId)

        if (!newPost) {
            return NextResponse.json({
                success: false,
                message: "Failed to delete the post",
                statusCode: 401
            })
        }


        return NextResponse.json({
            success: true,
            message: "Successfully deleted the post",
            data: newPost,
            statusCode: 401

        });
    } catch (error) {
        console.error("Error while deleting the post ", error);
        const response: ApiResponse = {
            success: false,
            message: "Failed to delete the post",
            statusCode: 401
        }
        return NextResponse.json(response);

    }
}

//TODO:GET ALL POST
export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Decode payload from the request
        const tokenId = decodeToken(request);

        // Check if the user is authenticated and verified
        if (!tokenId) {
            return NextResponse.json({
                success: false,
                message: "Invalid or expired token.",
                statusCode: 401,
            });
        }

        // Check if the user exists and is verified
        const user = await UserModel.findById(tokenId)?.select("-password");
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found.",
                statusCode: 404,
            });
        }

        if (!user.isVerified) {
            return NextResponse.json({
                success: false,
                message: "User is not verified.",
                statusCode: 401,
            });
        }

        // Helper function for aggregating posts by type
        const fetchPostsByType = async (typeKeyword?: string) => {
            const matchCondition: Record<string, any> = { owner: user._id };
            if (typeKeyword) {
                // Use $regex to match the keyword within the `type` field
                matchCondition.type = { $regex: typeKeyword, $options: "i" }; // Case-insensitive match
            }

            // console.log(`Fetching posts with type including: ${typeKeyword || "all"}`);
            // console.log("Match Condition:", matchCondition);
            return PostModel.aggregate([
                { $match: matchCondition },
                {
                    $lookup: {
                        from: "likes", // Assuming "likes" is a collection in your database
                        localField: "_id",
                        foreignField: "media",
                        as: "likes",
                    },
                },
                {
                    $addFields: {
                        totalLikes: { $size: "$likes" },
                    },
                },
                { $sort: { createdAt: -1 } },
                {
                    $project: {
                        _id: 1,
                        url: 1,
                        description: 1,
                        owner: 1,
                        tag: 1,
                        totalLikes: 1,
                        type: 1,
                        name: 1
                    },
                },
            ]);
        };

        // Fetch posts by type
        const [allActivities, audioTracks, videoTracks, imageTracks] = await Promise.all([
            fetchPostsByType(), // No type filter for allActivities
            fetchPostsByType("audio"), // Fetch audio tracks
            fetchPostsByType("video"), // Fetch video tracks
            fetchPostsByType("image"), // Fetch image tracks
        ]);

        // Verify the output of each query
        console.log("All Activities:", allActivities);
        console.log("Audio Tracks:", audioTracks);
        console.log("Video Tracks:", videoTracks);
        console.log("Image Tracks:", imageTracks);

        const returnData = {
            audioTrack: audioTracks?.length ? audioTracks : null,
            videoTrack: videoTracks?.length ? videoTracks : null,
            imageTrack: imageTracks?.length ? imageTracks : null,
            allActivities: allActivities?.length ? allActivities : null,
        };

        return NextResponse.json({
            success: true,
            message: "Fetched posts successfully.",
            statusCode: 200,
            data: returnData,
        });
    } catch (error) {
        console.error("Error while fetching posts: ", error);
        return NextResponse.json({
            success: false,
            message: "Failed to fetch posts.",
            statusCode: 500,
        });
    }
}



// TODO:upload a post 
export async function PATCH(request: NextRequest): Promise<NextResponse> {
    try {

        const { description, tag, postId } = await request.json();

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


        //update user details
        let newPost = await PostModel.findByIdAndUpdate(
            {
                _id: postId
            },
            {
                description,
                tag
            }
        )

        return NextResponse.json({
            success: true,
            message: "Post updated successfully",
            data: newPost,
            statusCode: 401

        });
    } catch (error) {
        console.error("Error while updating a the post", error);
        const response: ApiResponse = {
            success: false,
            message: "Failed to updating a the post",
            statusCode: 401
        }
        return NextResponse.json(response);

    }
}

