import {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef,
} from 'react';
import { useFetchingData } from './useFetchingData';
import { fetchActivities } from '../../api/activityApi';

const PAGE_SIZE = 2;
const THRESHOLD = 50;

export const useLazyLoadPage = () => {
    const {
        data: allActivities = [],
        isFetching,
        error,
    } = useFetchingData<Activity[]>(['activities'], fetchActivities);

    const [offset, setOffset] = useState(PAGE_SIZE); // ⚠️ khởi tạo luôn 1 PAGE
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const mountedRef = useRef(true);

    // Reset khi dữ liệu thay đổi (VD: chuyển trang)
    useEffect(() => {
        setOffset(PAGE_SIZE); // reset lại đúng PAGE_SIZE
        setHasMore(true);
        setIsLoadingMore(false);
    }, [allActivities]);

    const visibleActivities = useMemo(() => {
        return allActivities.slice(0, offset);
    }, [allActivities, offset]);

    const loadMore = useCallback(() => {
        if (!hasMore || isFetching || isLoadingMore) return;

        setIsLoadingMore(true);

        setOffset((prev) => {
            const newOffset = Math.min(prev + PAGE_SIZE, allActivities.length);
            if (newOffset >= allActivities.length) {
                setHasMore(false);
            }
            return newOffset;
        });

        setTimeout(() => {
            if (mountedRef.current) {
                setIsLoadingMore(false);
            }
        }, 1000); // delay nhẹ để tránh flicker
    }, [hasMore, isFetching, isLoadingMore, offset, allActivities.length]);

    // Scroll trigger
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if (scrollTop + clientHeight + THRESHOLD >= scrollHeight) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loadMore]);

    // Auto load nếu nội dung chưa đủ để scroll
    useEffect(() => {
        if (
            hasMore &&
            !isFetching &&
            !isLoadingMore &&
            document.body.scrollHeight <= window.innerHeight
        ) {
            loadMore();
        }
    }, [hasMore, isFetching, isLoadingMore, visibleActivities.length, loadMore]);

    // Cleanup
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    return {
        isFetching,
        isLoadingMore,
        activities: visibleActivities,
        hasMore,
        error,
    };
};
