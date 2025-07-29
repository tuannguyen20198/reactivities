import { Box, CircularProgress, Grid2 } from "@mui/material";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";
import { useLazyLoadPage } from "@/hook/useLazyLoadPage";

export default function ActivityDashboard() {
  const { activities, isFetching, hasMore } = useLazyLoadPage();
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={8}>
        {activities.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Không có hoạt động nào.</div>
        ) : (
          <>
            <ActivityList activities={activities} />
            {isFetching && (
              <Box sx={{ textAlign: 'center' }}>
                <CircularProgress />
              </Box>
            )}
            {!hasMore && (
              <div style={{ textAlign: 'center' }}>
                Hết thông tin hiển thị
              </div>
            )}
          </>
        )}
      </Grid2>
      <Grid2 size={4} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <ActivityFilters />
      </Grid2>
    </Grid2 >
  );
}

