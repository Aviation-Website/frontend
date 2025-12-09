"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { useSignUp } from "@/hooks/mutations/use-sign-up";

const Logo = () => <Image src="/Logo/Logo-OG.png" alt="AirSpeak Logo" className="rounded-md" width={28} height={28} />;
const AuthWaves = () => <Image src="/Auth/auth-wave.png" alt="Auth Waves" className="absolute top-0 left-0 w-full h-full object-cover opacity-50 -z-10" width={1920} height={1080} />;
export function Signup() {
  const router = useRouter();
  const { mutate: signUp, isLoading, error } = useSignUp();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    re_password: "",
    first_name: "",
    last_name: "",
    country: "",
  });

  const [validationErrors, setValidationErrors] = useState<{
    password?: string;
    username?: string;
    re_password?: string;
  }>({});

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

    // Password Regex: At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      errors.password = "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
      isValid = false;
    }

    // Username Regex: Alphanumeric only
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(formData.username)) {
      errors.username = "Username can only contain letters and numbers.";
      isValid = false;
    }

    if (formData.password !== formData.re_password) {
      errors.re_password = "Passwords do not match.";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await signUp(formData);
      router.push(`/verification?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      console.error("Sign up failed:", err);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen ">
      <AuthWaves />
      <div className="absolute top-8 left-8 z-10">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-bold text-lg">AirSpeak</span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6 z-10">


        <Card className="mt-4 sm:mx-auto sm:w-full sm:max-w-md z-10">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h3 className="mt-2 text-center text-lg font-bold text-foreground dark:text-foreground">
                  Create new account for workspace
                </h3>
              </div>

              {/* Email and Form Fields */}

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                  <p className="text-sm text-destructive">
                    {error.message || "Sign up failed. Please try again."}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label
                    htmlFor="first_name"
                    className="text-sm font-medium text-foreground dark:text-foreground"
                  >
                    First Name
                  </Label>
                  <Input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    autoComplete="given-name"
                    placeholder="First Name"
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="last_name"
                    className="text-sm font-medium text-foreground dark:text-foreground"
                  >
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    autoComplete="family-name"
                    placeholder="Last Name"
                    className="mt-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="galal@dev.co"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Username
                </Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  placeholder="Choose a username"
                  className="mt-2"
                  required
                />
                {validationErrors.username && (
                  <p className="text-xs text-destructive mt-1">{validationErrors.username}</p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="country"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Country
                </Label>
                <Input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  autoComplete="country-name"
                  placeholder="e.g., Egypt"
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground dark:text-foreground"
                  >
                    Password
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    placeholder="Password"
                    className="mt-2"
                    required
                  />
                  {validationErrors.password && (
                    <p className="text-xs text-destructive mt-1">{validationErrors.password}</p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="re_password"
                    className="text-sm font-medium text-foreground dark:text-foreground"
                  >
                    Confirm password
                  </Label>
                  <Input
                    type="password"
                    id="re_password"
                    name="re_password"
                    value={formData.re_password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    placeholder="Password"
                    className="mt-2"
                    required
                  />
                  {validationErrors.re_password && (
                    <p className="text-xs text-destructive mt-1">{validationErrors.re_password}</p>
                  )}
                </div>
              </div>

              <div className="mt-2 flex items-start">
                <div className="flex h-6 items-center">
                  <Checkbox
                    id="newsletter-login-05"
                    name="newsletter-login-05"
                    className="size-4 cursor-pointer"
                  />
                </div>
                <Label
                  htmlFor="newsletter-login-05"
                  className="ml-3 text-sm leading-6 text-muted-foreground dark:text-muted-foreground cursor-pointer"
                >
                  Sign up to our newsletter
                </Label>
              </div>

              <Button
                type="submit"
                className="mt-4 w-full py-2 font-medium cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>

              <p className="text-center text-xs text-muted-foreground dark:text-muted-foreground">
                By signing in, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90 hover:underline cursor-pointer"
                >
                  Terms of use
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="capitalize text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90 hover:underline cursor-pointer"
                >
                  Privacy policy
                </Link>
              </p>
              <p className="mt-6 text-center text-sm text-muted-foreground dark:text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90 cursor-pointer hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>


      </div>
    </div>
  );
}
