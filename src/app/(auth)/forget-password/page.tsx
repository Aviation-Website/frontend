import type { Metadata } from "next";
import { ForgetPassword } from "@/components/Auth/ForgetPassword/ForgetPassword";

export const metadata: Metadata = {
  title: "Forget Password | AirSpeak",
  description: "Reset your password to regain access to your AirSpeak account.",
};

export default function forgetPasswordPage() {
  return <ForgetPassword />;
}
