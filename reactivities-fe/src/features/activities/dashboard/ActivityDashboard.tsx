import { useLazyLoadPage } from "@/hook/useLazyLoadPage";
import { Box, CircularProgress, Grid2 } from "@mui/material";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";

export default function ActivityDashboard() {
  const { activities, isLoadingMore, isFetching, hasMore } = useLazyLoadPage();

  return (
    <Box sx={{ minHeight: '100vh', px: 2, py: 2 }}>
      <Grid2 container spacing={3}>
        <Grid2 size={8}>
          {activities.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>Không có hoạt động nào.</div>
          ) : (
            <>
              <ActivityList activities={activities} />

              {isLoadingMore && (
                <Box sx={{ textAlign: 'center', my: 2 }}>
                  <CircularProgress size={25} />
                </Box>
              )}
              {isFetching && (
                <Box sx={{ textAlign: 'center' }}>
                  <CircularProgress />
                </Box>
              )}
              {!hasMore && (
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  Hết thông tin hiển thị
                </div>
              )}
            </>
          )}
        </Grid2>

        <Grid2 size={4} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <ActivityFilters />
        </Grid2>
      </Grid2>
    </Box>
  );
}
