import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { JSX, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const DiscordIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.5382-9.6752-3.567-13.6607a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z"/>
  </svg>
);

const GoogleIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z" />
  </svg>
);

const Logo = () => <Image src="/Logo/Logo-OG.png" alt="AirSpeak Logo" className="rounded-md" width={28} height={28} />;
const AuthWaves = ()=> <Image src="/Auth/auth-wave.png" alt="Auth Waves" className="absolute top-0 left-0 w-full h-full object-cover opacity-30 -z-10" width={1920} height={1080} />;

export function Login() {
  return (
    <div className="relative flex items-center justify-center min-h-screen ">
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
              <p className="font-medium text-lg text-foreground dark:text-foreground">Welcome to AirSpeak</p>
              <h3 className="mt-6 text-lg font-semibold text-foreground dark:text-foreground">
                Sign in to your account
              </h3>
              <p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90 cursor-pointer hover:underline"
                >
                  Sign up
                </Link>
              </p>
              <div className="mt-8 flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button variant="outline" className="flex-1 items-center justify-center space-x-2 py-2" asChild>
                  <a href="#">
                    <DiscordIcon className="size-5" aria-hidden={true} />
                    <span className="text-sm font-medium">Login with Discord</span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="mt-2 flex-1 items-center justify-center space-x-2 py-2 sm:mt-0"
                  asChild
                >
                  <a href="#">
                    <GoogleIcon className="size-4" aria-hidden={true} />
                    <span className="text-sm font-medium">Login with Google</span>
                  </a>
                </Button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or</span>
                </div>
              </div>

              <form action="#" method="post" className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="email-login-04" className="text-sm font-medium text-foreground dark:text-foreground">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email-login-04"
                    name="email-login-04"
                    autoComplete="email"
                    placeholder="galal@dev.co"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="password-login-04"
                    className="text-sm font-medium text-foreground dark:text-foreground"
                  >
                    Password
                  </Label>
                  <Input
                    type="password"
                    id="password-login-04"
                    name="password-login-04"
                    autoComplete="password"
                    placeholder="********"
                    className="mt-2"
                  />
                </div>
                <Button type="submit" className="mt-4 w-full py-2 font-medium cursor-pointer">
                  Sign in
                </Button>
              </form>
              <p className="mt-6 text-sm text-muted-foreground dark:text-muted-foreground">
                Forgot your password?{" "}
                <Link
                  href="/forget-password"
                  className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90 cursor-pointer hover:underline"
                >
                  Reset password
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
