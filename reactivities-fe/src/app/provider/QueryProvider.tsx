// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { ReactNode } from "react";

// // Tạo QueryClient đơn giản nhất cho v4
// const queryClient = new QueryClient();

// interface QueryProviderProps {
//     children: ReactNode;
// }

// export function QueryProvider({ children }: QueryProviderProps) {
//     return (
//         <QueryClientProvider client={queryClient}>
//             {children}
//             <ReactQueryDevtools initialIsOpen={false} />
//         </QueryClientProvider>
//     );
// }