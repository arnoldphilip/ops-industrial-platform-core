import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';

const data = [
    { name: '00:00', value: 400, load: 240 },
    { name: '04:00', value: 300, load: 139 },
    { name: '08:00', value: 200, load: 980 },
    { name: '12:00', value: 278, load: 390 },
    { name: '16:00', value: 189, load: 480 },
    { name: '20:00', value: 239, load: 380 },
    { name: '23:59', value: 349, load: 430 },
];

const teamData = [
    { name: 'Team Alpha', completed: 45, pending: 12 },
    { name: 'Team Beta', completed: 32, pending: 8 },
    { name: 'Team Gamma', completed: 58, pending: 15 },
    { name: 'Team Delta', completed: 24, pending: 22 },
];

const Analytics = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">System Performance</h2>
                <p className="text-muted-foreground">Historical analysis of industrial throughput and team efficiency.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Load Distribution Area Chart */}
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">Load Distribution</h3>
                        <span className="text-xs font-medium px-2.5 py-1 bg-primary/10 text-primary rounded-full">Real-time Data</span>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        borderColor: 'hsl(var(--border))',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Area type="monotone" dataKey="load" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Team Efficiency Bar Chart */}
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                    <h3 className="text-lg font-semibold mb-6">Team Throughput</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={teamData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        borderColor: 'hsl(var(--border))',
                                        borderRadius: '12px'
                                    }}
                                />
                                <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="pending" fill="hsl(var(--error))" fillOpacity={0.4} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Role-specific insight (Supervisor only) */}
            <div className="bg-primary/5 border border-primary/10 p-8 rounded-3xl">
                <div className="max-w-2xl">
                    <h4 className="text-xl font-bold mb-2">Automated Optimization Report</h4>
                    <p className="text-muted-foreground leading-relaxed">
                        Based on current throughput patterns, shifting 15% of Team Delta's load to Team Alpha is recommended during the 08:00 - 12:00 window to maintain 99.9% uptime.
                    </p>
                    <button className="mt-6 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:translate-y-[-2px] transition-all shadow-lg shadow-primary/20">
                        Export Detailed Analysis
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
