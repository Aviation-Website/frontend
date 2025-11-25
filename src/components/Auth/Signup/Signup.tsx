import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

const Logo = () => <Image src="/Logo/Logo-OG.png" alt="AirSpeak Logo" className="rounded-md" width={28} height={28} />;
const AuthWaves = ()=> <Image src="/Auth/auth-wave.png" alt="Auth Waves" className="absolute top-0 left-0 w-full h-full object-cover opacity-50 -z-10" width={1920} height={1080} />;
export function Signup() {
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
              <div>
                <Label
                  htmlFor="name-login-05"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Name
                </Label>
                <Input
                  type="text"
                  id="name-login-05"
                  name="name-login-05"
                  autoComplete="name-login-05"
                  placeholder="Name"
                  className="mt-2"
                />
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

              <div>
                <Label
                  htmlFor="password-login-05"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Password
                </Label>
                <Input
                  type="password"
                  id="password-login-05   "
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
