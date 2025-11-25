import { Login } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | AirSpeak",
  description: "Sign in to your AirSpeak account to access professional aviation communication training and interactive scenarios.",
};

export default function LoginPage() {
  return <>
    <Login />
  </>
}
