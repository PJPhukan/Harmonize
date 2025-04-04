import { decodeToken } from "@/helpers/authHelpers";
import { NotificationModel } from "@/model/notification.model";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(request: NextRequest, { params }: { params: { notificationId: string } }): Promise<NextResponse> {

    try {
        const tokenId = decodeToken(request);
        const { notificationId } = await params;

        if (!notificationId) {
            return NextResponse.json({
                success: false,
                message: "Invalid notification Id",
                statusCode: 401
            })
        }
        // Check if the user is authenticated
        if (!tokenId) {
            return NextResponse.json({
                success: false,
                message: "Invalid or expired token.",
                statusCode: 401,
            });
        }

        const notification = await NotificationModel.findById(notificationId)
        if (!notification) {
            return NextResponse.json({
                success: false,
                message: "Notification not found",
                statusCode: 404,
            });
        }
        await notification.deleteOne();

        return NextResponse.json({
            success: true,
            message: "Notification deleted successfully",
            statusCode: 200,
        });

    } catch (error) {
        console.error("Error Notification deleting ", error);
        return NextResponse.json({
            success: false,
            message: "Failed to delete notification.",
            statusCode: 500,
        });
    }

}