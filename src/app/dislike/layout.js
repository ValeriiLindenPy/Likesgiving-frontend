import QueryProvider from "@/components/Query/QueryProvider";



export default function DisikeLayout({
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