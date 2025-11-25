import { Signup } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | AirSpeak",
  description: "Create your AirSpeak account and start mastering aviation communication with real-world scenarios and interactive training.",
};

export default function SignupPage() {
  return <>
    <Signup />
  </>
}
