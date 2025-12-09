import { get, patch } from "@/lib/api/client-api";
import type { User } from "@/lib/auth/types";

export interface AdminUser extends User {
    is_active: boolean;
    is_superuser: boolean;
    is_staff: boolean;
}

export const adminService = {
    async getUsers(): Promise<AdminUser[]> {
        const users = await get<AdminUser[]>("/admin/users");
        // Ensure all user IDs are numbers (API might return strings)
        return users.map(user => ({
            ...user,
            id: typeof user.id === 'string' ? parseInt(user.id, 10) : user.id
        }));
    },

    async setUserActive(id: number | string, is_active: boolean): Promise<AdminUser> {
        // Convert to number if it's a string
        const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
        
        if (isNaN(numericId)) {
            throw new Error(`Invalid user ID: "${id}" is not a valid number`);
        }
        
        const user = await patch<AdminUser>(`/admin/users/${numericId}`, { is_active });
        
        // Ensure the returned user ID is a number
        return {
            ...user,
            id: typeof user.id === 'string' ? parseInt(user.id, 10) : user.id
        };
    },
};
