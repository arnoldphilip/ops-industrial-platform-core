import { memo } from 'react';
import type { KPIData } from '../types';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { clsx } from 'clsx';

interface KPICardProps {
    data: KPIData;
    loading?: boolean;
}

export const KPICard = memo(({ data, loading }: KPICardProps) => {
    if (loading) {
        return (
            <div className="bg-card p-6 rounded-2xl border border-border animate-pulse space-y-4">
                <div className="h-4 w-24 bg-secondary rounded" />
                <div className="h-8 w-32 bg-secondary rounded" />
                <div className="h-4 w-16 bg-secondary rounded" />
            </div>
        );
    }

    const TrendIcon = data.trend > 0 ? ArrowUpRight : data.trend < 0 ? ArrowDownRight : Minus;

    return (
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm font-medium text-muted-foreground mb-1">{data.title}</p>
            <div className="flex items-baseline gap-1">
                <h3 className="text-2xl font-bold tracking-tight">
                    {typeof data.value === 'number' ? data.value.toLocaleString() : data.value}
                    {data.unit && <span className="text-lg font-medium ml-0.5">{data.unit}</span>}
                </h3>
            </div>
            <div className={clsx(
                "flex items-center gap-1 mt-2 text-xs font-semibold",
                data.trend > 0 ? "text-success" : data.trend < 0 ? "text-error" : "text-muted-foreground"
            )}>
                <TrendIcon size={14} />
                <span>{Math.abs(data.trend)}% {data.trend >= 0 ? 'increase' : 'decrease'}</span>
                <span className="text-muted-foreground font-normal ml-1">vs yesterday</span>
            </div>
        </div>
    );
});

KPICard.displayName = 'KPICard';
