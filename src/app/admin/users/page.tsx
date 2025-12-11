"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
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
    Phone,
    Loader2,
    Eye,
    Trash2,
    X as CloseIcon,
    Calendar,
    UserCircle
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
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

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

    const handleViewDetails = async (targetUser: AdminUser) => {
        setSelectedUser(targetUser);
        setShowDetailsModal(true);
    };

    const handleDeleteUser = (targetUser: AdminUser) => {
        setUserToDelete(targetUser);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (!userToDelete || !user || !user.is_superuser) {
            setError("You must be a superuser to perform this action");
            return;
        }

        if (userToDelete.is_superuser) {
            setError("Cannot delete superuser accounts");
            return;
        }

        if (user.id === userToDelete.id) {
            setError("You cannot delete your own account");
            return;
        }

        try {
            setActionUserId(userToDelete.id);
            await adminService.deleteUser(userToDelete.id);
            setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
            setError(null);
            setShowDeleteConfirm(false);
            setUserToDelete(null);
        } catch (err) {
            console.error("[Admin UI] Failed to delete user:", err);
            let errorMessage = "Failed to delete user";
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
            <main className="relative max-w-[1600px] mx-auto pt-28 pb-12 px-4 sm:px-6 lg:px-8 z-10">

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
                                <div className="hidden md:block overflow-x-auto overflow-y-visible">
                                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                                        <thead className="bg-slate-50/50 dark:bg-slate-900/50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">User</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Contact</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Phone</th>
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
                                                        onViewDetails={handleViewDetails}
                                                        onDelete={handleDeleteUser}
                                                        openMenuId={openMenuId}
                                                        setOpenMenuId={setOpenMenuId}
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
                                                onViewDetails={handleViewDetails}
                                                onDelete={handleDeleteUser}
                                            />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* View Details Modal */}
                {showDetailsModal && selectedUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800"
                        >
                            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">User Details</h2>
                                <button
                                    onClick={() => {
                                        setShowDetailsModal(false);
                                        setSelectedUser(null);
                                    }}
                                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                >
                                    <CloseIcon className="w-6 h-6" />
                                </button>
                            </div>
                            
                            <div className="p-6 space-y-6">
                                {/* Profile Section */}
                                <div className="flex items-center space-x-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                                    {selectedUser.profile_picture ? (
                                        <Image
                                            src={
                                                selectedUser.profile_picture.startsWith('http://') || selectedUser.profile_picture.startsWith('https://')
                                                    ? selectedUser.profile_picture
                                                    : `${process.env.NEXT_PUBLIC_DJANGO_API_URL || 'http://localhost:8000'}${selectedUser.profile_picture}`
                                            }
                                            alt="Profile"
                                            width={80}
                                            height={80}
                                            className="h-20 w-20 rounded-full object-cover ring-4 ring-primary/20"
                                        />
                                    ) : (
                                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl">
                                            {selectedUser.first_name?.[0] || selectedUser.username[0].toUpperCase()}
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                                            {selectedUser.first_name || selectedUser.last_name 
                                                ? `${selectedUser.first_name ?? ""} ${selectedUser.last_name ?? ""}`.trim() 
                                                : selectedUser.username}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-400">@{selectedUser.username}</p>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-slate-900 dark:text-white flex items-center">
                                        <Mail className="w-5 h-5 mr-2 text-primary" />
                                        Contact Information
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Email</p>
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedUser.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Phone</p>
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">{selectedUser.phone_number || "Not provided"}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Account Information */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-slate-900 dark:text-white flex items-center">
                                        <UserCircle className="w-5 h-5 mr-2 text-primary" />
                                        Account Information
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Role</p>
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                selectedUser.is_staff
                                                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                                    : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
                                            }`}>
                                                {selectedUser.is_staff ? "Staff" : "User"}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Status</p>
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                selectedUser.is_active
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                            }`}>
                                                {selectedUser.is_active ? "Active" : "Inactive"}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Email Verified</p>
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                selectedUser.is_active
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                            }`}>
                                                {selectedUser.is_active ? "Verified" : "Unverified"}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Superuser</p>
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                selectedUser.is_superuser
                                                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                                    : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
                                            }`}>
                                                {selectedUser.is_superuser ? "Yes" : "No"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Timestamps */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-slate-900 dark:text-white flex items-center">
                                        <Calendar className="w-5 h-5 mr-2 text-primary" />
                                        Timestamps
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Joined</p>
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                                {new Date(selectedUser.date_joined).toLocaleDateString('en-US', { 
                                                    year: 'numeric', 
                                                    month: 'long', 
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Last Login</p>
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                                {selectedUser.last_login 
                                                    ? new Date(selectedUser.last_login).toLocaleDateString('en-US', { 
                                                        year: 'numeric', 
                                                        month: 'long', 
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })
                                                    : "Never"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && userToDelete && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-md w-full border border-slate-200 dark:border-slate-800"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                                    <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                                </div>
                                <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
                                    Delete User Account
                                </h3>
                                <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
                                    Are you sure you want to delete <strong>{userToDelete.username}</strong>? This action cannot be undone.
                                </p>
                                
                                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-6">
                                    <div className="flex items-center mb-2">
                                        <UserCircle className="w-4 h-4 mr-2 text-slate-400" />
                                        <span className="text-sm text-slate-600 dark:text-slate-400">
                                            {userToDelete.first_name || userToDelete.last_name 
                                                ? `${userToDelete.first_name ?? ""} ${userToDelete.last_name ?? ""}`.trim() 
                                                : userToDelete.username}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="w-4 h-4 mr-2 text-slate-400" />
                                        <span className="text-sm text-slate-600 dark:text-slate-400">{userToDelete.email}</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => {
                                            setShowDeleteConfirm(false);
                                            setUserToDelete(null);
                                        }}
                                        disabled={actionUserId === userToDelete.id}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        className="flex-1"
                                        onClick={confirmDelete}
                                        disabled={actionUserId === userToDelete.id}
                                    >
                                        {actionUserId === userToDelete.id ? (
                                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        ) : (
                                            <Trash2 className="w-4 h-4 mr-2" />
                                        )}
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </main>
        </div>
    );
}

function UserRow({ user, currentUser, onToggle, isProcessing, onViewDetails, onDelete, openMenuId, setOpenMenuId }: {
    user: AdminUser;
    currentUser: any;
    onToggle: (u: AdminUser) => void;
    isProcessing: boolean;
    onViewDetails: (u: AdminUser) => void;
    onDelete: (u: AdminUser) => void;
    openMenuId: number | null;
    setOpenMenuId: (id: number | null) => void;
}) {
    const isSelf = user.id === currentUser.id;
    const canToggle = !isSelf;
    const isMenuOpen = openMenuId === user.id;
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [menuPos, setMenuPos] = useState<{ top: number; left: number; width: number } | null>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen, setOpenMenuId]);

    // Calculate and update portal menu position relative to button
    useEffect(() => {
        const updatePos = () => {
            const btn = buttonRef.current;
            if (!btn) return;
            const rect = btn.getBoundingClientRect();
            const marginTop = 8; // same as mt-2 in previous inline menu
            setMenuPos({ top: rect.bottom + marginTop, left: rect.right - 192 /* menu width */, width: 192 });
        };

        if (isMenuOpen) {
            updatePos();
            window.addEventListener('scroll', updatePos, true);
            window.addEventListener('resize', updatePos);
        }

        return () => {
            window.removeEventListener('scroll', updatePos, true);
            window.removeEventListener('resize', updatePos);
        };
    }, [isMenuOpen]);

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
                    <Phone className="w-4 h-4 mr-2 text-slate-400" />
                    {user.phone_number || "Not provided"}
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
            <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex items-center justify-end">
                    <div className="relative">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId(isMenuOpen ? null : user.id);
                            }}
                            className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white h-8 w-8 p-0"
                            ref={buttonRef}
                        >
                            <MoreVertical className="w-5 h-5" />
                        </Button>
                        {isMenuOpen && menuPos && createPortal(
                            <div
                                ref={menuRef}
                                style={{
                                    position: 'fixed',
                                    top: menuPos.top,
                                    left: menuPos.left,
                                    width: menuPos.width,
                                    zIndex: 1000,
                                }}
                                className="bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                            >
                                <div className="py-1">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onViewDetails(user);
                                            setOpenMenuId(null);
                                        }}
                                        className="flex items-center w-full px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                    >
                                        <Eye className="w-3 h-3 mr-1" />
                                        View Details
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (!isSelf) {
                                                onDelete(user);
                                                setOpenMenuId(null);
                                            }
                                        }}
                                        disabled={isSelf}
                                        className="flex items-center w-full px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Trash2 className="w-3 h-3 mr-1" />
                                        Delete User
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (canToggle && !isProcessing) {
                                                onToggle(user);
                                                setOpenMenuId(null);
                                            }
                                        }}
                                        disabled={!canToggle || isProcessing}
                                        className="flex items-center w-full px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                                Processing...
                                            </>
                                        ) : user.is_active ? (
                                            <>
                                                <XCircle className="w-3 h-3 mr-1" />
                                                Deactivate
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                                Activate
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>,
                            document.body
                        )}
                    </div>
                </div>
            </td>
        </motion.tr>
    );
}

function UserCard({ user, currentUser, onToggle, isProcessing, onViewDetails, onDelete }: {
    user: AdminUser;
    currentUser: any;
    onToggle: (u: AdminUser) => void;
    isProcessing: boolean;
    onViewDetails: (u: AdminUser) => void;
    onDelete: (u: AdminUser) => void;
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
                    <Phone className="w-4 h-4 mr-2 text-slate-400" />
                    {user.phone_number || "Not provided"}
                </div>
                <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-slate-400" />
                    {user.is_staff ? "Staff Member" : "Regular User"}
                </div>
            </div>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => onViewDetails(user)}
                >
                    <Eye className="w-4 h-4 mr-2" />
                    Details
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    disabled={isSelf}
                    onClick={() => onDelete(user)}
                >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                </Button>
            </div>

            <Button
                variant={user.is_active ? "destructive" : "outline"}
                size="sm"
                className={`w-full mt-2 ${!user.is_active ? "border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20" : ""}`}
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
