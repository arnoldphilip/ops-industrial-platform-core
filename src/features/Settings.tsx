import React from 'react';
import { useConfigStore } from '../store';

const Settings = () => {
    const { flags, setFlags } = useConfigStore();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Configure your dashboard experience and feature flags.</p>
            </div>

            <div className="max-w-xl space-y-6">
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                    <h3 className="font-bold text-lg mb-4">Feature Toggles</h3>
                    <div className="space-y-4">
                        {Object.entries(flags).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                                <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                <button
                                    onClick={() => setFlags({ ...flags, [key]: !value })}
                                    className={`w-11 h-6 rounded-full transition-colors relative ${value ? 'bg-primary' : 'bg-secondary'}`}
                                >
                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
