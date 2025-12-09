"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { authService } from "@/lib/auth/auth-service";
import Image from "next/image";
import Link from "next/link";

const AuthWaves = () => <Image src="/Auth/auth-wave.png" alt="Auth Waves" className="absolute top-0 left-0 w-full h-full object-cover opacity-30 -z-10" width={1920} height={1080} />;

export function Account() {
    const Logo = () => <Image src="/Logo/Logo-OG.png" alt="AirSpeak Logo" className="rounded-md" width={28} height={28} />;
    const AuthWaves = () => <Image src="/Auth/auth-wave.png" alt="Auth Waves" className="absolute top-0 left-0 w-full h-full object-cover opacity-30 -z-10" width={1920} height={1080} />;

    const { user, refreshUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        country: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                country: user.country || "",
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            await authService.updateProfile(formData);
            await refreshUser();
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (err) {
            console.error("Profile update failed:", err);
            setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        return null; // Or a loading spinner / redirect handled by protected route
    }

    return (
        <div className="relative min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <AuthWaves />
            <div className="absolute top-8 left-8 z-10">
                <Link href="/" className="flex items-center gap-2">
                    <Logo />
                    <span className="font-bold text-lg">AirSpeak</span>
                </Link>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
                            Account Settings
                        </h2>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {message && (
                                <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'}`}>
                                    {message.text}
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <Label htmlFor="first_name">First name</Label>
                                    <div className="mt-2">
                                        <Input
                                            type="text"
                                            name="first_name"
                                            id="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            autoComplete="given-name"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <Label htmlFor="last_name">Last name</Label>
                                    <div className="mt-2">
                                        <Input
                                            type="text"
                                            name="last_name"
                                            id="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            autoComplete="family-name"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <Label htmlFor="email">Email address</Label>
                                    <div className="mt-2">
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            value={user.email}
                                            disabled
                                            className="bg-gray-100 dark:bg-slate-800 cursor-not-allowed opacity-75"
                                        />
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                            Email cannot be changed directly. Contact support if needed.
                                        </p>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <Label htmlFor="country">Country</Label>
                                    <div className="mt-2">
                                        <Input
                                            type="text"
                                            name="country"
                                            id="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            autoComplete="country-name"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 dark:border-white/10 pt-6">
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
