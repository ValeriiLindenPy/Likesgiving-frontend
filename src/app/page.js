"use client";

import { SBar } from "@/components/StatisticBar/SBar";
import { useSession } from "next-auth/react";
import api from "./api/auth/baseaxios";
import useSWR from "swr";
// import Loading from "./loading";






export default function Home() {
  const { data: session } = useSession();
  const fetcher = url => api.get(url, {
    headers: {
      Authorization: `Token ${session?.token}`,
    },
  }).then(res => res.data)

  const { data, error } = useSWR('/posts/get_statistics/', fetcher)
  console.log(data)


  return (
    <main className="homeMain">


      <div className="homeBar">
        <h1>Likes vs Dislikes</h1>
        <SBar dislikes={data?.today_dislikes} likes={data?.today_likes} />
        <h2 style={{
          marginTop: '20px',
        }}>{data?.today_likes} L : {data?.today_dislikes} D</h2>
      </div>


    </main>
  )
}
