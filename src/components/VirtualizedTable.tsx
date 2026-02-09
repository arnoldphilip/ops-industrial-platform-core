import { memo, useMemo, useState } from 'react';
import { FixedSizeList } from 'react-window';
import type { TaskRow } from '../types';
import { clsx } from 'clsx';
import { ArrowUpDown, ChevronUp, ChevronDown, Pin } from 'lucide-react';

interface VirtualizedTableProps {
    data: TaskRow[];
    height: number;
}

type SortConfig = {
    key: keyof TaskRow;
    direction: 'asc' | 'desc' | null;
};

export const VirtualizedTable = memo(({ data, height }: VirtualizedTableProps) => {
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'lastUpdated', direction: 'desc' });
    const pinnedColumns = ['title']; // Simplified as state setter was unused

    const sortedData = useMemo(() => {
        if (!sortConfig.direction) return data;

        return [...data].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];

            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);

    const toggleSort = (key: keyof TaskRow) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const item = sortedData[index];
        if (!item) return null;

        return (
            <div
                style={style}
                className={clsx(
                    "flex items-center px-4 border-b border-border/50 hover:bg-secondary/50 transition-colors",
                    index % 2 === 0 ? "bg-card" : "bg-card/30"
                )}
            >
                <div className={clsx(
                    "flex-1 font-medium truncate pr-4",
                    pinnedColumns.includes('title') && "font-bold text-primary"
                )}>
                    {item.title}
                </div>
                <div className="w-32 text-sm text-muted-foreground">{item.assignedTo}</div>
                <div className="w-24 px-2">
                    <span className={clsx(
                        "text-[10px] uppercase font-bold px-2 py-1 rounded-full whitespace-nowrap",
                        item.status === 'Completed' ? "bg-success/10 text-success" :
                            item.status === 'Escalated' ? "bg-error/10 text-error" :
                                item.status === 'In Progress' ? "bg-primary/10 text-primary" :
                                    "bg-secondary text-muted-foreground"
                    )}>
                        {item.status}
                    </span>
                </div>
                <div className="w-24 text-sm font-medium">
                    <span className={clsx(
                        item.priority === 'Critical' ? "text-error" :
                            item.priority === 'High' ? "text-warning" :
                                "text-muted-foreground"
                    )}>
                        {item.priority}
                    </span>
                </div>
                <div className="w-32">
                    <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                        <div
                            className="bg-primary h-full transition-all duration-500"
                            style={{ width: `${item.progress}%` }}
                        />
                    </div>
                </div>
            </div>
        );
    };

    const HeaderItem = ({ label, sortKey, width }: { label: string, sortKey?: keyof TaskRow, width: string | number }) => {
        const isSorted = sortConfig.key === sortKey;
        return (
            <div
                className={clsx(
                    "flex items-center gap-2 group cursor-pointer select-none",
                    width === 'flex-1' ? "flex-1" : `w-${width}`
                )}
                onClick={() => sortKey && toggleSort(sortKey)}
            >
                <span>{label}</span>
                {sortKey && (
                    <span className={clsx(
                        "transition-opacity duration-200",
                        isSorted ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                    )}>
                        {isSorted ? (
                            sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                        ) : <ArrowUpDown size={14} />}
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className="w-full border border-border rounded-xl overflow-hidden bg-card flex flex-col h-full">
            <div className="flex items-center px-4 py-3 bg-secondary/50 border-b border-border text-xs font-bold uppercase tracking-wider text-muted-foreground shrink-0">
                <div className="flex-1 flex items-center gap-2">
                    <HeaderItem label="Task Description" sortKey="title" width="flex-1" />
                    <Pin size={12} className="text-primary rotate-45" />
                </div>
                <div className="w-32"><HeaderItem label="Assigned" sortKey="assignedTo" width={32} /></div>
                <div className="w-24 px-2"><HeaderItem label="Status" sortKey="status" width={24} /></div>
                <div className="w-24"><HeaderItem label="Priority" sortKey="priority" width={24} /></div>
                <div className="w-32">Progress</div>
            </div>
            <div className="flex-1 min-h-0">
                <FixedSizeList
                    height={height - 100} // Adjust for header and footer
                    itemCount={sortedData.length}
                    itemSize={56}
                    width="100%"
                    className="scrollbar-hide"
                >
                    {Row}
                </FixedSizeList>
            </div>
            <div className="px-4 py-2 border-t border-border bg-secondary/20 text-xs text-muted-foreground flex justify-between shrink-0">
                <span>Showing {sortedData.length.toLocaleString()} records • Sorted by {sortConfig.key}</span>
                <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    Hardware Accelerated Virtualization
                </span>
            </div>
        </div>
    );
});

VirtualizedTable.displayName = 'VirtualizedTable';
