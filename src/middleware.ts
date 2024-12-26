import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value || "";
    const url = request.nextUrl;

    // If the token is missing and the user is trying to access a protected page, redirect to the login page
    if (!token && url.pathname.includes("/dashboard")) {
        return NextResponse.redirect(new URL(`/login`, request.url));
    }

    // If the token exists and the user is trying to access the login page, redirect to the dashboard
    if (token && url.pathname.includes("/sign-in")) {
        return NextResponse.redirect(new URL(`/dashboard`, request.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/dashboard',
        '/',
        '/verify/:path*',
        '/messages/:path*',
    ]
}
