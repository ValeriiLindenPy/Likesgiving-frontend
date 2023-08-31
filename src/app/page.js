"use client";

import { useSession } from "next-auth/react";
// import Loading from "./loading";






export default function Home() {
  const { data: session, status } = useSession();
  // const load = true;

  // if (load) {
  //   return <Loading />
  // }




  return (
    <main>

      <h1>Home </h1>

    </main>
  )
}
