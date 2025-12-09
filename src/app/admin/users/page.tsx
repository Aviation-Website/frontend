"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar/Navbar";
import { useAuth } from "@/hooks/use-auth";
import { adminService, type AdminUser } from "@/lib/admin/admin-service";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
    Search,
    Filter,
    User,
    Shield,
    ShieldAlert,
    CheckCircle2,
    XCircle,
    MoreVertical,
    Mail,
    Globe,
    Loader2
} from "lucide-react";

const AuthWaves = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <Image
            src="/Auth/auth-wave.png"
            alt="Background Waves"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-30 dark:opacity-20"
            width={1920}
            height={1080}
            priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background" />
    </div>
);

export default function AdminUsersPage() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    const [users, setUsers] = useState<AdminUser[]>([]);
    const [isUsersLoading, setIsUsersLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [actionUserId, setActionUserId] = useState<number | null>(null);

    // Filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

    // Redirect non-admins away
    useEffect(() => {
        if (isLoading) return;
        if (!isAuthenticated) {
            router.replace("/login");
            return;
        }
        if (!user) return;
        if (!user.is_superuser) {
            router.replace("/home");
        }
    }, [isLoading, isAuthenticated, user, router]);

    // Load users for admins
    useEffect(() => {
        if (!isAuthenticated || !user?.is_superuser) return;

        const fetchUsers = async () => {
            try {
                setIsUsersLoading(true);
                setError(null);
                const data = await adminService.getUsers();
                setUsers(data);
            } catch (err) {
                console.error("Failed to load users:", err);
                setError(err instanceof Error ? err.message : "Failed to load users");
            } finally {
                setIsUsersLoading(false);
            }
        };

        fetchUsers();
    }, [isAuthenticated, user]);

    const handleToggleActive = async (target: AdminUser) => {
        if (!user || !user.is_superuser) {
            setError("You must be a superuser to perform this action");
            return;
        }
        if (target.is_superuser) {
            setError("Cannot edit superuser accounts");
            return;
        }
        if (user.id === target.id && target.is_active) {
            setError("You cannot deactivate your own account");
            return;
        }

        try {
            setActionUserId(target.id);
            const newStatus = !target.is_active;
            const updated = await adminService.setUserActive(target.id, newStatus);

            setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
            setError(null);
        } catch (err) {
            console.error("[Admin UI] Failed to update user:", err);
            let errorMessage = "Failed to update user";
            if (err instanceof Error) errorMessage = err.message;

            if (errorMessage.includes("Permission") || errorMessage.includes("403")) {
                setError(`Permission Denied: ${errorMessage}`);
            } else if (errorMessage.includes("401") || errorMessage.includes("Unauthorized")) {
                setError(`Session Expired: Please refresh the page and try again`);
            } else {
                setError(errorMessage);
            }
        } finally {
            setActionUserId(null);
        }
    };

    const filteredUsers = useMemo(() => {
        return users.filter(u => {
            if (u.is_superuser) return false; // Hide superusers

            const matchesSearch =
                (u.first_name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
                (u.last_name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
                u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.email.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus =
                statusFilter === "all" ||
                (statusFilter === "active" ? u.is_active : !u.is_active);

            return matchesSearch && matchesStatus;
        });
    }, [users, searchQuery, statusFilter]);

    if (isLoading) return null;
    if (!isAuthenticated || !user?.is_superuser) return null;

    return (
        <div className="relative min-h-screen bg-slate-50/50 dark:bg-slate-950/50 transition-colors duration-300">
            <AuthWaves />
            <Navbar />
            <main className="relative max-w-7xl mx-auto pt-28 pb-12 px-4 sm:px-6 lg:px-8 z-10">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">User Management</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage user access and account status</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Search users..."
                                className="pl-9 w-full sm:w-[250px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
                            <SelectTrigger className="w-full sm:w-[180px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm transition-all duration-200">
                                <div className="flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-slate-400" />
                                    <SelectValue placeholder="Filter Status" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Users</SelectItem>
                                <SelectItem value="active">Active Only</SelectItem>
                                <SelectItem value="inactive">Inactive Only</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Card className="border-slate-200/60 dark:border-slate-800/60 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl overflow-hidden">
                    <CardContent className="p-0">
                        {error && (
                            <div className="m-4 rounded-lg bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 flex items-center gap-2">
                                <ShieldAlert className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        {isUsersLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                                <Loader2 className="w-8 h-8 animate-spin mb-2 text-primary" />
                                <p>Loading users database...</p>
                            </div>
                        ) : filteredUsers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                                <User className="w-12 h-12 mb-3 opacity-20" />
                                <p className="text-lg font-medium">No users found</p>
                                <p className="text-sm">Try adjusting your search or filters</p>
                            </div>
                        ) : (
                            <>
                                {/* Desktop Table View */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                                        <thead className="bg-slate-50/50 dark:bg-slate-900/50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">User</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Contact</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Location</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Role</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-transparent">
                                            <AnimatePresence initial={false}>
                                                {filteredUsers.map((u) => (
                                                    <UserRow
                                                        key={u.id}
                                                        user={u}
                                                        currentUser={user}
                                                        onToggle={handleToggleActive}
                                                        isProcessing={actionUserId === u.id}
                                                    />
                                                ))}
                                            </AnimatePresence>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile Card View */}
                                <div className="md:hidden space-y-4 p-4">
                                    <AnimatePresence initial={false}>
                                        {filteredUsers.map((u) => (
                                            <UserCard
                                                key={u.id}
                                                user={u}
                                                currentUser={user}
                                                onToggle={handleToggleActive}
                                                isProcessing={actionUserId === u.id}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}

function UserRow({ user, currentUser, onToggle, isProcessing }: {
    user: AdminUser;
    currentUser: any;
    onToggle: (u: AdminUser) => void;
    isProcessing: boolean;
}) {
    const isSelf = user.id === currentUser.id;
    const canToggle = !isSelf;

    return (
        <motion.tr
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {user.first_name?.[0] || user.username[0].toUpperCase()}
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                            {user.first_name || user.last_name ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() : user.username}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">@{user.username}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                    <Mail className="w-4 h-4 mr-2 text-slate-400" />
                    {user.email}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                    <Globe className="w-4 h-4 mr-2 text-slate-400" />
                    {user.country || "Unknown"}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.is_staff
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                    : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
                    }`}>
                    {user.is_staff ? "Staff" : "User"}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.is_active
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }`}>
                    {user.is_active ? "Active" : "Inactive"}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button
                    variant={user.is_active ? "destructive" : "outline"}
                    size="sm"
                    disabled={!canToggle || isProcessing}
                    onClick={() => onToggle(user)}
                    className={!user.is_active ? "border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20" : ""}
                >
                    {isProcessing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : user.is_active ? (
                        "Deactivate"
                    ) : (
                        "Activate"
                    )}
                </Button>
            </td>
        </motion.tr>
    );
}

function UserCard({ user, currentUser, onToggle, isProcessing }: {
    user: AdminUser;
    currentUser: any;
    onToggle: (u: AdminUser) => void;
    isProcessing: boolean;
}) {
    const isSelf = user.id === currentUser.id;
    const canToggle = !isSelf;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 shadow-sm"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm mr-3">
                        {user.first_name?.[0] || user.username[0].toUpperCase()}
                    </div>
                    <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                            {user.first_name || user.last_name ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() : user.username}
                        </div>
                        <div className="text-xs text-slate-500">@{user.username}</div>
                    </div>
                </div>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${user.is_active
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }`}>
                    {user.is_active ? "Active" : "Inactive"}
                </span>
            </div>

            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-4">
                <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-slate-400" />
                    {user.email}
                </div>
                <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-2 text-slate-400" />
                    {user.country || "Unknown"}
                </div>
                <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-slate-400" />
                    {user.is_staff ? "Staff Member" : "Regular User"}
                </div>
            </div>

            <Button
                variant={user.is_active ? "destructive" : "outline"}
                size="sm"
                className={`w-full ${!user.is_active ? "border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20" : ""}`}
                disabled={!canToggle || isProcessing}
                onClick={() => onToggle(user)}
            >
                {isProcessing ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : user.is_active ? (
                    <><XCircle className="w-4 h-4 mr-2" /> Deactivate Account</>
                ) : (
                    <><CheckCircle2 className="w-4 h-4 mr-2" /> Activate Account</>
                )}
            </Button>
        </motion.div>
    );
}
