import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createContext, ReactNode, useContext } from "react";

// Tạo QueryClient đơn giản trước
const queryClient = new QueryClient();

// Context type đơn giản
interface QueryContextType {
    queryClient: QueryClient;
}

const QueryContext = createContext<QueryContextType | undefined>(undefined);

// Hook để sử dụng context
export function useQueryContext() {
    const context = useContext(QueryContext);
    if (!context) {
        throw new Error("useQueryContext must be used within QueryContextProvider");
    }
    return context;
}

// Provider component đơn giản
interface QueryContextProviderProps {
    children: ReactNode;
}

export function QueryContextProvider({ children }: QueryContextProviderProps) {
    const contextValue: QueryContextType = {
        queryClient,
    };

    return (
        <QueryContext.Provider value={contextValue}>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </QueryContext.Provider>
    );
}

// Export queryClient
export { queryClient };