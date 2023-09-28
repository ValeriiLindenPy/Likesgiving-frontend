import QueryProvider from "@/components/Query/QueryProvider";



export default function LikeLayout({
    children, // will be a page or nested layout
}) {
    return (
        <>
            <QueryProvider>
                {children}
            </QueryProvider>



        </>

    )
}