import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { KPICard } from '../components/KPICard';
import { VirtualizedTable } from '../components/VirtualizedTable';
import { DataService } from '../services/data.service';
import type { KPIData, TaskRow } from '../types';
import { RefreshCw, Search, Filter, Box } from 'lucide-react';
import { useConfigStore } from '../store';

const Dashboard = () => {
    const [kpis, setKpis] = useState<KPIData[]>([]);
    const [tasks, setTasks] = useState<TaskRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    // const { flags } = useConfigStore(); // Flags available but not used in this specific view for now

    // Load initial data
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const kpiData = DataService.getKPIs();
            const taskData = DataService.generateTasks(10000);

            setKpis(kpiData);
            setTasks(taskData);
            setLoading(false);
        };
        loadData();
    }, []);

    // Real-time polling mock
    useEffect(() => {
        const interval = setInterval(() => {
            setIsRefreshing(true);
            // Simulate partial update
            setKpis(prev => prev.map(kpi => ({
                ...kpi,
                value: typeof kpi.value === 'number' ? kpi.value + (Math.random() - 0.5) : kpi.value
            })));
            setTimeout(() => setIsRefreshing(false), 1000);
        }, 10000); // Poll every 10s

        return () => clearInterval(interval);
    }, []);

    // Performance optimization: Filter tasks memoization
    const filteredTasks = useMemo(() => {
        if (!searchTerm) return tasks;
        return tasks.filter(t =>
            t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [tasks, searchTerm]);

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* KPI Section */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">System Overview</h2>
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        {isRefreshing && <RefreshCw size={14} className="animate-spin text-primary" />}
                        <span>Live Sync Active</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, i) => <KPICard key={i} data={{} as any} loading />)
                    ) : (
                        kpis.map(kpi => <KPICard key={kpi.id} data={kpi} />)
                    )}
                </div>
            </section>

            {/* Main Operations Section */}
            <section className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold tracking-tight">Active Workflows</h2>
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search 10k+ tasks..."
                                className="pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-64 transition-all"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                        <button className="p-2.5 bg-card border border-border rounded-xl hover:bg-secondary transition-colors" title="Filters">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                <div className="h-[600px] w-full relative">
                    {loading ? (
                        <div className="absolute inset-0 bg-card/50 backdrop-blur-sm rounded-xl flex items-center justify-center border border-border">
                            <div className="flex flex-col items-center gap-4">
                                <Box className="animate-bounce text-primary" size={32} />
                                <p className="text-sm font-medium animate-pulse">Initializing Virtual Grid...</p>
                            </div>
                        </div>
                    ) : (
                        <VirtualizedTable data={filteredTasks} height={600} />
                    )}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
