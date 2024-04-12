import QueryProvider from "@/components/Query/QueryProvider";
import { ReduxProvider } from "@/redux/ReduxProvider";



export default function ProfileLayout({
    children, 
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