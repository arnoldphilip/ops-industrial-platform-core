import { useState, useEffect, useMemo, useCallback } from 'react';
import { KPICard } from '../components/KPICard';
import { VirtualizedTable } from '../components/VirtualizedTable';
import { DataService } from '../services/data.service';
import { useRealTimeData } from '../hooks/useRealTimeData';
import type { KPIData, TaskRow } from '../types';
import { RefreshCw, Search, Box, AlertCircle, WifiOff } from 'lucide-react';

const Dashboard = () => {
    const [tasks, setTasks] = useState<TaskRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Use the advanced WebSocket simulation hook for KPIs
    const {
        data: kpis,
        status: wsStatus,
        reconnect
    } = useRealTimeData<KPIData>(
        DataService.getKPIs(),
        DataService.simulateUpdate,
        5000 // Update every 5s
    );

    // Load initial tasks (10k items)
    useEffect(() => {
        const loadTasks = async () => {
            setLoading(true);
            // Simulate slight delay for 10k generation
            const taskData = DataService.generateTasks(10000);
            setTasks(taskData);
            setLoading(false);
        };
        loadTasks();
    }, []);

    // Filter tasks memoization
    const filteredTasks = useMemo(() => {
        if (!searchTerm) return tasks;
        const lowerSearch = searchTerm.toLowerCase();
        return tasks.filter(t =>
            t.title.toLowerCase().includes(lowerSearch) ||
            t.assignedTo.toLowerCase().includes(lowerSearch)
        );
    }, [tasks, searchTerm]);

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* KPI Section */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight">System Telemetry</h2>
                        <p className="text-xs text-muted-foreground flex items-center gap-2">
                            {wsStatus === 'open' ? (
                                <>
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                                    </span>
                                    Connection: WebSocket Streaming (Live)
                                </>
                            ) : wsStatus === 'connecting' ? (
                                <>
                                    <RefreshCw size={12} className="animate-spin text-warning" />
                                    Establishing Encrypted Uplink...
                                </>
                            ) : (
                                <>
                                    <WifiOff size={12} className="text-error" />
                                    Data stream interrupted
                                </>
                            )}
                        </p>
                    </div>

                    {wsStatus === 'closed' && (
                        <button
                            onClick={reconnect}
                            className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-bold hover:bg-primary/20 transition-colors"
                        >
                            Reconnect Stream
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {kpis.map(kpi => (
                        <KPICard key={kpi.id} data={kpi} />
                    ))}
                </div>
            </section>

            {/* Main Operations Section */}
            <section className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight">Operational Grid</h2>
                        <p className="text-xs text-muted-foreground italic">Hardware-accelerated rendering for {tasks.length.toLocaleString()} tasks</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Global search logic..."
                                className="pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-72 transition-all shadow-sm"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                        <button className="p-2.5 bg-card border border-border rounded-xl hover:bg-secondary transition-colors" title="Export CSV">
                            <Box size={18} />
                        </button>
                    </div>
                </div>

                <div className="h-[650px] w-full relative group">
                    {loading ? (
                        <div className="absolute inset-0 bg-secondary/20 backdrop-blur-md rounded-2xl flex items-center justify-center border-2 border-dashed border-border overflow-hidden">
                            <div className="flex flex-col items-center gap-6 text-center max-w-xs">
                                <div className="relative">
                                    <Box className="animate-bounce text-primary" size={48} />
                                    <RefreshCw className="absolute -bottom-2 -right-2 animate-spin text-muted-foreground" size={20} />
                                </div>
                                <div className="space-y-2">
                                    <p className="font-bold text-lg">Indexing Operational Data</p>
                                    <p className="text-xs text-muted-foreground">Reconciling 10,000+ industrial records for high-frequency virtualization...</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <VirtualizedTable data={filteredTasks} height={650} />
                            {filteredTasks.length === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="bg-card p-6 rounded-2xl border border-border shadow-2xl flex items-center gap-4 animate-in zoom-in slide-in-from-top-4">
                                        <AlertCircle className="text-warning" size={32} />
                                        <p className="font-medium">No results found for "{searchTerm}"</p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
