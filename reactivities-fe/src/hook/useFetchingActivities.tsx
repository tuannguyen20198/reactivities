// hooks/useFetchingData.ts
import { fetchActivities } from '@/api/activityApi';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useFetchingActivities(
    queryKey?: string[],
    queryFn?: () => Promise<any>,
    enabled: boolean = true
): UseQueryResult<any> {
    return useQuery({
        queryKey: queryKey || ['activities'],
        queryFn: async () => {
            console.log('📦 fetching activities...');
            return (queryFn || fetchActivities)();
        },
        enabled,
        staleTime: 0,
    });
}
