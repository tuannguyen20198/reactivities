import { getActivityDetail } from "@/api/activityApi";
import { useParams } from "react-router";
import { useQuery, UseQueryResult } from '@tanstack/react-query';

// Assuming Activity is your type, adjust as needed
interface Activity {
    // Add your activity properties here
}

export function useActivityDetails(): UseQueryResult<Activity> {
    const { id } = useParams<{ id: string }>();

    return useQuery<Activity>({
        queryKey: ["activities", id],
        queryFn: () => getActivityDetail(id as string),
        enabled: !!id,
        staleTime: 0,
    });
}