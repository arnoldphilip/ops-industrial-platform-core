import type { TaskRow, KPIData } from '../types';

export const DataService = {
    generateTasks: (count: number): TaskRow[] => {
        const statuses: TaskRow['status'][] = ['Pending', 'In Progress', 'Completed', 'Escalated'];
        const priorities: TaskRow['priority'][] = ['Low', 'Medium', 'High', 'Critical'];
        const names = ['John Smith', 'Sarah Chen', 'Mike Ross', 'Elena Gilbert', 'David Wang', 'Anna Muller'];

        return Array.from({ length: count }, (_, i) => ({
            id: `task-${i + 1}`,
            title: `Industrial Inspection ${i + 1} - Section ${Math.floor(i / 100)}`,
            assignedTo: names[i % names.length],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            priority: priorities[Math.floor(Math.random() * priorities.length)],
            lastUpdated: new Date(Date.now() - Math.random() * 86400000).toISOString(),
            progress: Math.floor(Math.random() * 100)
        }));
    },

    getKPIs: (): KPIData[] => [
        { id: '1', title: 'SLA Compliance', value: 94.2, unit: '%', trend: 2.1, status: 'success' },
        { id: '2', title: 'Downtime', value: 12.5, unit: 'hrs', trend: -1.5, status: 'warning' },
        { id: '3', title: 'Tasks Completed', value: 1240, trend: 12, status: 'neutral' },
        { id: '4', title: 'Pending Escalations', value: 8, trend: -3, status: 'error' },
    ],

    // New method for real-time delta simulation
    simulateUpdate: (kpis: KPIData[]): KPIData[] => {
        return kpis.map(kpi => {
            const delta = (Math.random() - 0.5) * 2;
            let newValue = typeof kpi.value === 'number' ? kpi.value + delta : kpi.value;

            // Keep values realistic
            if (typeof newValue === 'number') {
                if (kpi.title === 'SLA Compliance') newValue = Math.min(100, Math.max(85, newValue));
                if (kpi.title === 'Downtime') newValue = Math.max(0, newValue);
            }

            return {
                ...kpi,
                value: typeof newValue === 'number' ? Number(newValue.toFixed(1)) : newValue,
                trend: Number((kpi.trend + (Math.random() - 0.5)).toFixed(1))
            };
        });
    }
};
