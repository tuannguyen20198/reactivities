import { CircularProgress, Alert, styled } from "@mui/material";

const LoadingWrapper = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    minHeight: "200px",
});

export function useStatusUI({
    isLoading,
    isError,
    error,
}: {
    isLoading: boolean;
    isError: boolean;
    error: unknown;
}) {
    if (isLoading) {
        return (
            <LoadingWrapper>
                <CircularProgress />
            </LoadingWrapper>
        );
    }

    if (isError) {
        return (
            <Alert severity="error">
                {(error as Error)?.message || "Something went wrong"}
            </Alert>
        );
    }

    return null;
}
