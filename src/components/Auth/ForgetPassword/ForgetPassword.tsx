"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { useRequestPasswordReset } from "@/hooks/mutations/use-password-reset";

const Logo = () => <Image src="/Logo/Logo-OG.png" alt="AirSpeak Logo" className="rounded-md" width={28} height={28} />;
const AuthWaves = () => <Image src="/Auth/auth-wave.png" alt="Auth Waves" className="absolute top-0 left-0 w-full h-full object-cover opacity-30 -z-10" width={1920} height={1080} />;

export function ForgetPassword() {
  const { mutate: requestReset, isLoading, error, isSuccess } = useRequestPasswordReset();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await requestReset({ email });
    } catch (err) {
      console.error("Password reset request failed:", err);
    }
  };

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
                Enter your email address
              </h3>
              <p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground">
                We'll send you a link to reset your password.
              </p>

              {isSuccess && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Password reset email sent! Check your inbox for further instructions.
                  </p>
                </div>
              )}

              {error && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                  <p className="text-sm text-destructive">
                    {error.message || "Failed to send reset email. Please try again."}
                  </p>
                  {error.code === "ACCOUNT_NOT_VERIFIED" && error.email && (
                    <p className="mt-2 text-xs text-muted-foreground dark:text-muted-foreground">
                      Your account is not verified yet.{" "}
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

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="email-reset" className="text-sm font-medium text-foreground dark:text-foreground">
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    id="email-reset"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="galal@dev.co"
                    className="mt-2"
                    required
                    disabled={isSuccess}
                  />
                </div>

                <Button
                  type="submit"
                  className="mt-4 w-full py-2 font-medium cursor-pointer"
                  disabled={isLoading || isSuccess}
                >
                  {isLoading ? "Sending..." : isSuccess ? "Email Sent" : "Send Reset Link"}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground dark:text-muted-foreground">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90 cursor-pointer hover:underline"
                >
                  Sign in
                </Link>
              </p>

              <p className="mt-4 text-center text-sm text-muted-foreground dark:text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90 cursor-pointer hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
