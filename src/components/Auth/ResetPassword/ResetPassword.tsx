"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { useConfirmPasswordReset } from "@/hooks/mutations/use-password-reset";
import { validatePassword, validatePasswordConfirmation } from "@/lib/utils/password-validation";

const Logo = () => <Image src="/Logo/Logo-OG.png" alt="AirSpeak Logo" className="rounded-md" width={28} height={28} />;
const AuthWaves = () => <Image src="/Auth/auth-wave.png" alt="Auth Waves" className="absolute top-0 left-0 w-full h-full object-cover opacity-30 -z-10" width={1920} height={1080} />;

interface ResetPasswordProps {
    uid?: string;
    token?: string;
}

export function ResetPassword({ uid: propUid, token: propToken }: ResetPasswordProps = {}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { mutate: confirmReset, isLoading, error, isSuccess } = useConfirmPasswordReset();

    const [formData, setFormData] = useState({
        new_password: "",
        re_new_password: "",
    });

    const [validationErrors, setValidationErrors] = useState<{
        new_password?: string;
        re_new_password?: string;
    }>({});

    const uid = propUid || searchParams.get("uid");
    const token = propToken || searchParams.get("token");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        
        // Clear validation error when user types
        if (validationErrors[name as keyof typeof validationErrors]) {
            setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = () => {
        const errors: typeof validationErrors = {};
        let isValid = true;

        // Validate password strength
        const passwordCheck = validatePassword(formData.new_password);
        if (!passwordCheck.isValid) {
            errors.new_password = passwordCheck.error;
            isValid = false;
        }

        // Validate password confirmation
        const confirmCheck = validatePasswordConfirmation(
            formData.new_password,
            formData.re_new_password
        );
        if (!confirmCheck.isValid) {
            errors.re_new_password = confirmCheck.error;
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!uid || !token) {
            return;
        }

        if (!validateForm()) {
            return;
        }

        try {
            await confirmReset({
                uid,
                token,
                new_password: formData.new_password,
                re_new_password: formData.re_new_password,
            });
        } catch (err) {
            console.error("Password reset failed:", err);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                router.push("/login");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, router]);

    if (!uid || !token) {
        return (
            <div className="relative flex items-center justify-center min-h-screen">
                <AuthWaves />
                <Card className="z-10">
                    <CardContent>
                        <div className="flex flex-1 flex-col justify-center px-4 py-2 lg:px-2">
                            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                                <p className="font-medium text-lg text-foreground">Invalid Reset Link</p>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    This password reset link is invalid or has expired. Please request a new one.
                                </p>
                                <Link href="/forget-password">
                                    <Button className="mt-6 w-full">Request New Link</Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="relative flex items-center justify-center min-h-screen">
            <AuthWaves />
            <div className="absolute top-8 left-8 z-10">
                <Link href="/" className="flex items-center gap-2">
                    <Logo />
                    <span className="font-bold text-lg">AirSpeak</span>
                </Link>
            </div>
            <Card className="z-10">
                <CardContent>
                    <div className="flex flex-1 flex-col justify-center px-4 py-2 lg:px-2">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            <p className="font-medium text-lg text-foreground dark:text-foreground">Reset your password</p>
                            <h3 className="mt-6 text-lg font-semibold text-foreground dark:text-foreground">
                                {isSuccess ? "Password reset successful!" : "Enter your new password"}
                            </h3>

                            {isSuccess && (
                                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                                    <p className="text-sm text-green-600 dark:text-green-400">
                                        ✓ Your password has been successfully reset! Redirecting to login...
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                                    <p className="text-sm text-destructive">
                                        {error.message || "Password reset failed. The link may be invalid or expired."}
                                    </p>
                                    {error.code === "ACCOUNT_NOT_VERIFIED" && error.email && (
                                        <p className="mt-2 text-xs text-muted-foreground dark:text-muted-foreground">
                                            Your account is not verified.{" "}
                                            <Link
                                                href={`/verification?email=${encodeURIComponent(error.email)}`}
                                                className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90 cursor-pointer hover:underline"
                                            >
                                                Click here to resend the verification email
                                            </Link>
                                        </p>
                                    )}
                                </div>
                            )}

                            {!isSuccess && (
                                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                                    <div>
                                        <Label htmlFor="new_password" className="text-sm font-medium text-foreground dark:text-foreground">
                                            New Password
                                        </Label>
                                        <Input
                                            type="password"
                                            id="new_password"
                                            name="new_password"
                                            value={formData.new_password}
                                            onChange={handleChange}
                                            autoComplete="new-password"
                                            placeholder="Enter new password"
                                            className="mt-2"
                                            required
                                        />
                                        {validationErrors.new_password && (
                                            <p className="text-xs text-destructive mt-1">{validationErrors.new_password}</p>
                                        )}
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Must be 8+ characters with uppercase, lowercase, number, and special character
                                        </p>
                                    </div>

                                    <div>
                                        <Label htmlFor="re_new_password" className="text-sm font-medium text-foreground dark:text-foreground">
                                            Confirm New Password
                                        </Label>
                                        <Input
                                            type="password"
                                            id="re_new_password"
                                            name="re_new_password"
                                            value={formData.re_new_password}
                                            onChange={handleChange}
                                            autoComplete="new-password"
                                            placeholder="Confirm new password"
                                            className="mt-2"
                                            required
                                        />
                                        {validationErrors.re_new_password && (
                                            <p className="text-xs text-destructive mt-1">{validationErrors.re_new_password}</p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-4 w-full py-2 font-medium cursor-pointer"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Resetting password..." : "Reset Password"}
                                    </Button>
                                </form>
                            )}

                            <p className="mt-6 text-center text-sm text-muted-foreground dark:text-muted-foreground">
                                Remember your password?{" "}
                                <Link
                                    href="/login"
                                    className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90 cursor-pointer hover:underline"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
