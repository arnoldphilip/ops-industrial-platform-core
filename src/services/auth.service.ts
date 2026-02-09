import { User, UserRole } from '../types';

const MOCK_USERS: Record<string, User> = {
    'worker': {
        id: '1',
        name: 'John Doe',
        email: 'worker@industry.com',
        role: 'Worker',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    },
    'supervisor': {
        id: '2',
        name: 'Jane Smith',
        email: 'supervisor@industry.com',
        role: 'Supervisor',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
    },
    'admin': {
        id: '3',
        name: 'Admin User',
        email: 'admin@industry.com',
        role: 'Admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
    }
};

export const AuthService = {
    login: async (username: string): Promise<{ user: User, token: string }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const roleKey = username.toLowerCase() as keyof typeof MOCK_USERS;
        const user = MOCK_USERS[roleKey] || MOCK_USERS['worker'];

        // In a real app, this would be a JWT from server
        const token = `mock-jwt-${user.role}-${Date.now()}`;

        return { user, token };
    },

    getCurrentUser: () => {
        // Logic to validate JWT and return user
        return null;
    }
};
