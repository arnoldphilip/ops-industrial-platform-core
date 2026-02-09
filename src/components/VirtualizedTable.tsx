import { memo } from 'react';
import { FixedSizeList as List } from 'react-window';
import type { TaskRow } from '../types';
import { clsx } from 'clsx';

interface VirtualizedTableProps {
    data: TaskRow[];
    height: number;
}

export const VirtualizedTable = memo(({ data, height }: VirtualizedTableProps) => {
    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const item = data[index];
        if (!item) return null;

        return (
            <div
                style={style}
                className={clsx(
                    "flex items-center px-4 border-b border-border/50 hover:bg-secondary/50 transition-colors",
                    index % 2 === 0 ? "bg-card" : "bg-card/30"
                )}
            >
                <div className="flex-1 font-medium truncate pr-4">{item.title}</div>
                <div className="w-32 text-sm text-muted-foreground">{item.assignedTo}</div>
                <div className="w-24 px-2">
                    <span className={clsx(
                        "text-[10px] uppercase font-bold px-2 py-1 rounded-full",
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

    return (
        <div className="w-full border border-border rounded-xl overflow-hidden bg-card">
            <div className="flex items-center px-4 py-3 bg-secondary/50 border-b border-border text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <div className="flex-1">Task Description</div>
                <div className="w-32">Assigned To</div>
                <div className="w-24 px-2">Status</div>
                <div className="w-24">Priority</div>
                <div className="w-32">Progress</div>
            </div>
            <List
                height={height}
                itemCount={data.length}
                itemSize={56}
                width="100%"
                className="scrollbar-hide"
            >
                {Row}
            </List>
            <div className="px-4 py-2 border-t border-border bg-secondary/20 text-xs text-muted-foreground flex justify-between">
                <span>Showing {data.length.toLocaleString()} operational records</span>
                <span>60 FPS Virtualized</span>
            </div>
        </div>
    );
});

VirtualizedTable.displayName = 'VirtualizedTable';
