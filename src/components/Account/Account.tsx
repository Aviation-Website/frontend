"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { authService } from "@/lib/auth/auth-service";
import Image from "next/image";
import Link from "next/link";
import { PhoneInputComponent } from "@/components/ui/phone-input";
import { Upload, X, User as UserIcon } from "lucide-react";

const AuthWaves = () => <Image src="/Auth/auth-wave.png" alt="Auth Waves" className="absolute top-0 left-0 w-full h-full object-cover opacity-30 -z-10" width={1920} height={1080} />;

export function Account() {
    const Logo = () => <Image src="/Logo/Logo-OG.png" alt="AirSpeak Logo" className="rounded-md" width={28} height={28} />;
    const AuthWaves = () => <Image src="/Auth/auth-wave.png" alt="Auth Waves" className="absolute top-0 left-0 w-full h-full object-cover opacity-30 -z-10" width={1920} height={1080} />;

    const { user, refreshUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
    const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                phone_number: user.phone_number || "",
            });
            // Set profile picture preview if exists
            if (user.profile_picture) {
                // Check if it's already a full URL (starts with http:// or https://)
                if (user.profile_picture.startsWith('http://') || user.profile_picture.startsWith('https://')) {
                    setProfilePicturePreview(user.profile_picture);
                } else {
                    // It's a relative path, prepend the Django API URL
                    const baseUrl = process.env.NEXT_PUBLIC_DJANGO_API_URL || "http://localhost:8000";
                    setProfilePicturePreview(`${baseUrl}${user.profile_picture}`);
                }
            } else {
                setProfilePicturePreview(null);
            }
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setMessage({ type: 'error', text: 'Please select a valid image file.' });
                return;
            }
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setMessage({ type: 'error', text: 'Image size must be less than 5MB.' });
                return;
            }
            setProfilePictureFile(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicturePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveProfilePicture = async () => {
        setIsLoading(true);
        setMessage(null);

        try {
            await authService.deleteProfilePicture();
            await refreshUser();
            setProfilePicturePreview(null);
            setProfilePictureFile(null);
            setMessage({ type: 'success', text: 'Profile picture removed successfully!' });
        } catch (err) {
            console.error("Failed to remove profile picture:", err);
            setMessage({ type: 'error', text: 'Failed to remove profile picture. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            const updateData = {
                ...formData,
                profile_picture: profilePictureFile || undefined,
            };
            await authService.updateProfile(updateData);
            await refreshUser();
            setProfilePictureFile(null); // Clear file after successful upload
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
        <div className="relative min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8">
            <AuthWaves />

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

                            {/* Profile Picture Section */}
                            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                                <Label className="text-base font-semibold">Profile Picture</Label>
                                <div className="mt-4 flex items-center gap-6">
                                    <div className="relative">
                                        {profilePicturePreview ? (
                                            <Image
                                                src={profilePicturePreview}
                                                alt="Profile"
                                                width={96}
                                                height={96}
                                                className="h-24 w-24 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                                            />
                                        ) : (
                                            <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center ring-2 ring-gray-200 dark:ring-gray-700">
                                                <UserIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleProfilePictureChange}
                                            className="hidden"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="flex items-center gap-2"
                                        >
                                            <Upload className="h-4 w-4" />
                                            {profilePicturePreview ? 'Change Picture' : 'Upload Picture'}
                                        </Button>
                                        {profilePicturePreview && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={handleRemoveProfilePicture}
                                                disabled={isLoading}
                                                className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                            >
                                                <X className="h-4 w-4" />
                                                Remove Picture
                                            </Button>
                                        )}
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            JPG, PNG, or GIF. Max 5MB.
                                        </p>
                                    </div>
                                </div>
                            </div>

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
                                    <Label htmlFor="phone_number">Phone Number</Label>
                                    <div className="mt-2">
                                        <PhoneInputComponent
                                            value={formData.phone_number}
                                            onChange={(value) => setFormData((prev) => ({ ...prev, phone_number: value || "" }))}
                                            placeholder="Enter phone number"
                                            id="phone_number"
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
