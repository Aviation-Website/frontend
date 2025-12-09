"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { useEmailVerification } from "@/hooks/mutations/use-email-verification";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, Plane, Loader2, ArrowRight } from "lucide-react";

const Logo = () => (
    <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-lg">
        <Image src="/Logo/Logo-OG.png" alt="AirSpeak Logo" fill className="object-cover" />
    </div>
);

const AuthWaves = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
            src="/Auth/auth-wave.png"
            alt="Auth Waves"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-40 dark:opacity-20 -z-10"
            width={1920}
            height={1080}
            priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background -z-10" />
    </div>
);

interface ActivateAccountProps {
    uid: string;
    token: string;
}

export function ActivateAccount({ uid, token }: ActivateAccountProps) {
    const router = useRouter();
    const { mutate: verifyEmail, isLoading, error, isSuccess } = useEmailVerification();

    useEffect(() => {
        if (uid && token) {
            verifyEmail({ uid, token }).catch(err => {
                console.error("Auto-verification failed:", err);
            });
        }
    }, [uid, token, verifyEmail]);

    const handleManualVerify = async () => {
        if (uid && token) {
            try {
                await verifyEmail({ uid, token });
            } catch (err) {
                console.error("Verification failed:", err);
            }
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

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
            <AuthWaves />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-8 left-8 z-20"
            >
                <Link href="/" className="flex items-center gap-3 group">
                    <Logo />
                    <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                        AirSpeak
                    </span>
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-full max-w-md z-10"
            >
                <Card className="border-slate-200/60 dark:border-slate-800/60 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl overflow-hidden">
                    <CardContent className="p-8 sm:p-10">
                        <div className="flex flex-col items-center text-center space-y-6">

                            {/* Status Icon Animation */}
                            <div className="relative w-24 h-24 flex items-center justify-center">
                                <AnimatePresence mode="wait">
                                    {isLoading && (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            className="absolute inset-0 flex items-center justify-center"
                                        >
                                            <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-[spin_3s_linear_infinite]" />
                                            <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-[spin_1.5s_linear_infinite]" />
                                            <Plane className="w-10 h-10 text-primary animate-pulse" />
                                        </motion.div>
                                    )}

                                    {isSuccess && (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            className="absolute inset-0 flex items-center justify-center"
                                        >
                                            <div className="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-full scale-100 animate-[ping_1s_ease-out_1]" />
                                            <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400 relative z-10" />
                                        </motion.div>
                                    )}

                                    {error && (
                                        <motion.div
                                            key="error"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            className="absolute inset-0 flex items-center justify-center"
                                        >
                                            <div className="absolute inset-0 bg-red-100 dark:bg-red-900/30 rounded-full" />
                                            <XCircle className="w-16 h-16 text-red-600 dark:text-red-400 relative z-10" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Text Content */}
                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                    {isLoading ? "Verifying Account" : isSuccess ? "Account Activated" : "Activation Failed"}
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 max-w-[280px] mx-auto leading-relaxed">
                                    {isLoading
                                        ? "Please wait while we verify your email address and set up your account."
                                        : isSuccess
                                            ? "Your email has been successfully verified. You are now ready to take off!"
                                            : "We couldn't verify your account. The link may be invalid or expired."
                                    }
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="w-full pt-2">
                                {isSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <p className="text-sm text-slate-400 dark:text-slate-500 mb-4">
                                            Redirecting to login in a few seconds...
                                        </p>
                                        <Button
                                            className="w-full h-11 text-base font-medium shadow-lg shadow-primary/20"
                                            onClick={() => router.push("/login")}
                                        >
                                            Go to Login Now <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </motion.div>
                                )}

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="space-y-3"
                                    >
                                        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-lg text-sm text-red-600 dark:text-red-400">
                                            {error.message || "Verification failed. Please try again or contact support."}
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="w-full h-11"
                                            onClick={handleManualVerify}
                                            disabled={isLoading}
                                        >
                                            Try Again
                                        </Button>
                                        <div className="pt-2">
                                            <Link
                                                href="/contact"
                                                className="text-sm text-slate-500 hover:text-primary transition-colors underline underline-offset-4"
                                            >
                                                Contact Support
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center"
                >
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        &copy; {new Date().getFullYear()} AirSpeak. All rights reserved.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}
