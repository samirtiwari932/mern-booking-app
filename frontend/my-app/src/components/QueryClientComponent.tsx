"use client"
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0
        }
    }
})


export default function QueryClientComponent({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>

            {children}
        </QueryClientProvider>
    );
}
