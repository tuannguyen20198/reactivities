// hooks/useFetchingData.ts
import { useQuery, QueryKey, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useFetchingData<T>(
    key: QueryKey,
    fetchFn: () => Promise<T>,
    options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
): UseQueryResult<T> {
    const query = useQuery<T>({
        queryKey: key,
        queryFn: fetchFn,
        ...options,
    });

    // 👇 Refetch khi quay lại tab
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                query.refetch();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [query]);

    return query;
}
