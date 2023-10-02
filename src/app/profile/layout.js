import QueryProvider from "@/components/Query/QueryProvider";
import { ReduxProvider } from "@/redux/ReduxProvider";



export default function ProfileLayout({
    children, // will be a page or nested layout
}) {
    return (
        <>
            <QueryProvider>
                <ReduxProvider>
                    {children}
                </ReduxProvider>
            </QueryProvider>
        </>

    )
}