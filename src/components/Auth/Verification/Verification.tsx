import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

const Logo = () => <Image src="/Logo/Logo-OG.png" alt="AirSpeak Logo" className="rounded-md" width={28} height={28} />;
const AuthWaves = () => <Image src="/Auth/auth-wave.png" alt="Auth Waves" className="absolute top-0 left-0 w-full h-full object-cover opacity-30 -z-10" width={1920} height={1080} />;

export function Verification() {
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
              <p className="font-medium text-lg text-foreground dark:text-foreground">Verify your email</p>
              <h3 className="mt-6 text-lg font-semibold text-foreground dark:text-foreground">
                Enter verification code
              </h3>
              <p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground">
                We&apos;ve sent a verification code to your email address. Please enter it below.
              </p>

              <form action="#" method="post" className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="verification-code" className="text-sm font-medium text-foreground dark:text-foreground">
                    Verification Code
                  </Label>
                  <Input
                    type="text"
                    id="verification-code"
                    name="verification-code"
                    placeholder="000000"
                    maxLength={6}
                    className="mt-2 text-center text-2xl tracking-widest"
                  />
                </div>

                <Button type="submit" className="mt-4 w-full py-2 font-medium cursor-pointer">
                  Verify Email
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground dark:text-muted-foreground">
                Didn&apos;t receive the code?{" "}
                <a
                  href="#"
                  className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90 cursor-pointer hover:underline"
                >
                  Resend code
                </a>
              </p>

              <p className="mt-4 text-center text-sm text-muted-foreground dark:text-muted-foreground">
                Back to{" "}
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
