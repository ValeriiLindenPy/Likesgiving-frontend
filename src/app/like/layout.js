import QueryProvider from "@/components/Query/QueryProvider";



export default function LikeLayout({
    children, 
}) {
    return (
        <>
            <QueryProvider>
                {children}
            </QueryProvider>



        </>

    )
}