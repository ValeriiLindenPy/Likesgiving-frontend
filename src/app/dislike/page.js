"use client";

import { useSession } from "next-auth/react";







export default function Like() {
  const { data: session, status } = useSession();





  return (
    <main>
      <h1>Dislike</h1>

    </main>
  )
}
