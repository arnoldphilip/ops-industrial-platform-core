import React from 'react';

const Team = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
            <p className="text-muted-foreground">Manage your operational units and shift schedules.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Alpha', 'Beta', 'Gamma'].map(team => (
                <div key={team} className="bg-card p-6 rounded-2xl border border-border">
                    <h3 className="font-bold text-lg mb-2">Team {team}</h3>
                    <p className="text-sm text-muted-foreground mb-4">8 Members Active</p>
                    <div className="flex -space-x-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <img
                                key={i}
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${team}${i}`}
                                className="w-8 h-8 rounded-full border-2 border-background"
                                alt="Member"
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default Team;
