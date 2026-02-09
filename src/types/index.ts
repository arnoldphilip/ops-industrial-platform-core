export type UserRole = 'Worker' | 'Supervisor' | 'Admin';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar: string;
}

export interface KPIData {
    id: string;
    title: string;
    value: string | number;
    trend: number;
    unit?: string;
    status: 'success' | 'warning' | 'error' | 'neutral';
}

export interface TaskRow {
    id: string;
    title: string;
    assignedTo: string;
    status: 'Pending' | 'In Progress' | 'Completed' | 'Escalated';
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    lastUpdated: string;
    progress: number;
}

export interface FeatureFlags {
    enableAnalytics: boolean;
    enableExtraKpis: boolean;
    enableLiveChat: boolean;
    enableExport: boolean;
}
