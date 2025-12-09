/**
 * Sign Up API Route
 * POST /api/auth/signup
 */

import { NextRequest, NextResponse } from "next/server";
import { djangoAPI } from "@/services/django-api.service";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, username, password, re_password, first_name, last_name, country } = body;

    // Received signup payload - forwarded to Django backend

        // Validate input
        if (!email || !username || !password || !re_password) {
            return NextResponse.json(
                { error: "Email, username, and passwords are required" },
                { status: 400 }
            );
        }

        if (password !== re_password) {
            return NextResponse.json(
                { error: "Passwords do not match" },
                { status: 400 }
            );
        }

        // Call Django API
        const result = await djangoAPI.auth.signUp({
            email,
            username,
            password,
            re_password,
            first_name: first_name || "",
            last_name: last_name || "",
            country: country || "",
        });

        console.log("[SignUp Route] User created successfully");

        return NextResponse.json(
            {
                message: "Account created successfully. Please check your email to activate your account.",
                user: result,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Sign up error:", error);
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to create account",
            },
            { status: 400 }
        );
    }
}
