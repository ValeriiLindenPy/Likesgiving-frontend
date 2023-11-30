"use client";

import { SBar } from "@/components/StatisticBar/SBar";
import { useSession } from "next-auth/react";
import useSWR from "swr";
// import Loading from "./loading";

export default function Home() {
  const { data: session } = useSession();
  
  const fetcher = async (url) => {
    const response = await fetch(url, {
      cache: "force-cache",
      headers: {
        Authorization: `Token ${session?.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const { data, error } = useSWR('https://ihl-project-606adf7a8500.herokuapp.com/posts/get_statistics/', fetcher);
  console.log(data);

  return (
    <main className="homeMain">
      <div className="homeBar">
        <h1>Likes vs Dislikes</h1>
        <SBar dislikes={data?.today_dislikes} likes={data?.today_likes} />
        <h2 style={{ marginTop: '20px' }}>
          {data?.today_likes} L : {data?.today_dislikes} D
        </h2>
      </div>
    </main>
  );
}
