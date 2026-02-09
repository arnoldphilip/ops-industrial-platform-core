import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[400px] w-full flex flex-col items-center justify-center p-8 text-center space-y-6 bg-card border border-border rounded-3xl animate-in fade-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center">
                        <AlertTriangle size={40} />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight">Industrial Controller Halted</h2>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            A critical runtime exception occurred in the dashboard engine. Safety protocols have isolated this component.
                        </p>
                    </div>
                    {this.state.error && (
                        <pre className="p-4 bg-secondary/50 rounded-xl text-xs text-left max-w-lg overflow-auto border border-border select-all">
                            <code>{this.state.error.toString()}</code>
                        </pre>
                    )}
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:translate-y-[-2px] transition-all shadow-lg shadow-primary/20"
                    >
                        <RefreshCcw size={16} />
                        Re-initialize Dashboard
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
