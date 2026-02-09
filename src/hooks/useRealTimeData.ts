import { useState, useEffect, useRef } from 'react';

type WebSocketStatus = 'connecting' | 'open' | 'closed' | 'error';

export function useRealTimeData<T>(
    initialData: T[],
    updateFn: (prevData: T[]) => T[],
    interval: number = 3000
) {
    const [data, setData] = useState<T[]>(initialData);
    const [status, setStatus] = useState<WebSocketStatus>('connecting');
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        // Simulate connection phase
        setStatus('connecting');
        const connectTimeout = setTimeout(() => {
            setStatus('open');
        }, 1500);

        return () => clearTimeout(connectTimeout);
    }, []);

    useEffect(() => {
        if (status !== 'open') return;

        timerRef.current = setInterval(() => {
            // Logic for stream "jitter" - occasionally skip an update or delay it
            if (Math.random() > 0.95) {
                console.warn('[WS Mock] Socket jitter detected, skipping packet...');
                return;
            }

            setData((prev) => updateFn(prev));
        }, interval);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [status, updateFn, interval]);

    const reconnect = () => {
        setStatus('connecting');
        setTimeout(() => setStatus('open'), 1000);
    };

    return { data, status, reconnect };
}
