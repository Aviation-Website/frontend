"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";

const Logo = () => <Image src="/Logo/Logo-OG.png" alt="AirSpeak Logo" className="rounded-md" width={28} height={28} />;
const AuthWaves = ()=> <Image src="/Auth/auth-wave.png" alt="Auth Waves" className="absolute top-0 left-0 w-full h-full object-cover opacity-50 -z-10" width={1920} height={1080} />;
export function Signup() {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();

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
            <form action="#" method="post" className="space-y-4">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h3 className="mt-2 text-center text-lg font-bold text-foreground dark:text-foreground">
            Create new account for workspace
          </h3>
        </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label
                    htmlFor="first-name-login-05"
                    className="text-sm font-medium text-foreground dark:text-foreground"
                  >
                    First Name
                  </Label>
                  <Input
                    type="text"
                    id="first-name-login-05"
                    name="first-name-login-05"
                    autoComplete="given-name"
                    placeholder="First Name"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="last-name-login-05"
                    className="text-sm font-medium text-foreground dark:text-foreground"
                  >
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    id="last-name-login-05"
                    name="last-name-login-05"
                    autoComplete="family-name"
                    placeholder="Last Name"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="email-login-05"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  id="email-login-05"
                  name="email-login-05"
                  autoComplete="email-login-05"
                  placeholder="galal@dev.co"
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label
                    htmlFor="password-login-05"
                    className="text-sm font-medium text-foreground dark:text-foreground"
                  >
                    Password
                  </Label>
                  <Input
                    type="password"
                    id="password-login-05"
                    name="password-login-05"
                    autoComplete="password-login-05"
                    placeholder="Password"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="confirm-password-login-05"
                    className="text-sm font-medium text-foreground dark:text-foreground"
                  >
                    Confirm password
                  </Label>
                  <Input
                    type="password"
                    id="confirm-password-login-05"
                    name="confirm-password-login-05"
                    autoComplete="confirm-password-login-05"
                    placeholder="Password"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="phone-login-05"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Phone Number
                </Label>
                <PhoneInput
                  international
                  defaultCountry="EG"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 items-center gap-2 [&_.PhoneInputCountry]:mr-0 [&_.PhoneInputCountrySelect]:h-full [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:border-none [&_.PhoneInputInput]:h-full"
                />
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

              <Button type="submit" className="mt-4 w-full py-2 font-medium cursor-pointer">
                Create account
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
