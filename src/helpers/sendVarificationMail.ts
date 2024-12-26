import { resend } from "@/lib/Resend";
import VerificationEmailTemplate from "@/templates/varification";
import { ApiResponse } from "./ApiResponse";
import { varificationEmailProps } from "@/types/varificationMailTypes";


export const varificationEmail = async ({ email, username, otp }: varificationEmailProps): Promise<ApiResponse> => {


    try {

        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: "Resonate verification code",
            react: VerificationEmailTemplate({ username, otp }),
        });

        if (error) {
            console.error("Failed to send email", error);
            return {
                success: false,
                message: "Failed to send email",
                statusCode: 500,
            };
        }

        return {
            success: true,
            message: "Verification email sent successfully",
            statusCode: 200,
        };
    } catch (error) {
        console.error("Failed to send varification email", error);
        return {
            success: false,
            message: "Failed to send varification email",
            statusCode: 500,
        };
    }

}

