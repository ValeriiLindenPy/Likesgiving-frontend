"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient();


export default function QueryProvider({
    children, // will be a page or nested layout
}) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>

        </>

    )
}