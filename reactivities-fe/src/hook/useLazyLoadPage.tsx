import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useFetchingActivities } from './useFetchingActivities';

const PAGE_SIZE = 2;
const THRESHOLD = 50;

export const useLazyLoadPage = () => {
    const {
        data: allActivities = [],
        isFetching,
        error,
    } = useFetchingActivities();

    const [offset, setOffset] = useState(PAGE_SIZE);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const autoLoadTriggeredRef = useRef(false);
    const mountedRef = useRef(true);
    // Reset khi dữ liệu thay đổi
    useEffect(() => {
        setOffset(PAGE_SIZE);
        setHasMore(true);
        setIsLoadingMore(false);
        autoLoadTriggeredRef.current = false;
    }, [allActivities]);

    const visibleActivities = useMemo(() => {
        return allActivities.slice(0, offset);
    }, [allActivities, offset]);

    // const loadMore = useCallback(() => {
    //     if (!hasMore || isFetching || isLoadingMore) return;

    //     setIsLoadingMore(true);

    //     const newOffset = Math.min(offset + PAGE_SIZE, allActivities.length);
    //     setOffset(newOffset);
    //     setIsLoadingMore(false);

    //     if (newOffset >= allActivities.length) {
    //         setHasMore(false);
    //     }
    // }, [offset, hasMore, isFetching, isLoadingMore, allActivities.length]);
    const loadMore = useCallback(() => {
        if (!hasMore || isFetching || isLoadingMore) return;

        console.log("👣 Load more triggered");
        setIsLoadingMore(true);

        const nextOffset = Math.min(offset + PAGE_SIZE, allActivities.length);
        const reachedEnd = nextOffset >= allActivities.length;

        // Delay cho hiệu ứng loading
        setTimeout(() => {
            if (!mountedRef.current) return;

            setOffset(nextOffset);
            setHasMore(!reachedEnd);
            setIsLoadingMore(false); // ✅ Chỉ set lại sau khi offset update
        }, 500); // delay vừa đủ cho loading spinner hiển thị
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
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMore]);

    // Auto-load nếu nội dung quá ít
    const shouldAutoLoad = useMemo(() => {
        return (
            hasMore &&
            !isFetching &&
            !isLoadingMore &&
            document.body.scrollHeight <= window.innerHeight &&
            !autoLoadTriggeredRef.current
        );
    }, [hasMore, isFetching, isLoadingMore, visibleActivities.length]);

    useEffect(() => {
        if (shouldAutoLoad) {
            autoLoadTriggeredRef.current = true;
            loadMore();
        }
    }, [shouldAutoLoad, loadMore]);

    return {
        isFetching,
        isLoadingMore,
        activities: visibleActivities,
        hasMore,
        error,
    };
};
