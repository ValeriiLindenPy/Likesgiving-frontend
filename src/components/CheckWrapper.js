"use client";


import { useSession } from "next-auth/react";
import NavBar from "./Navbar";




export const CheckWrapper = ({ children }) => {
    const { data: sessionData } = useSession();



    return (

        <>
            {sessionData && <NavBar />}
            {children}
        </>
    )
}