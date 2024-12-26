import { resend } from "@/lib/Resend";
import ResentPasswordEmailTemplate from "@/templates/reset-password";
import { ApiResponse } from "./ApiResponse";
import { varificationEmailProps } from "@/types/varificationMailTypes";


export const resetPassword = async ({ email, username, otp }: varificationEmailProps): Promise<ApiResponse> => {


    try {

        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: "Reset Your Password - OTP Inside",
            react: ResentPasswordEmailTemplate({ username, otp }),
        });

        if (error) {
            console.error("Failed to send otp", error);
            return {
                success: false,
                message: "Failed to send otp",
                statusCode: 500,
            };
        }

        return {
            success: true,
            message: "Reset password OTP sent successfully",
            statusCode: 200,
        };
    } catch (error) {
        console.error("Failed to send OTP", error);
        return {
            success: false,
            message: "Failed to send reset password OTP",
            statusCode: 500,
        };
    }

}

