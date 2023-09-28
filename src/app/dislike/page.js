"use client";
import { useState, Fragment } from "react";
import { getPosts } from "@/lib/get-posts";
import { useSession } from "next-auth/react";
import { Post } from "@/components/Posts";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { AddPostBtn } from "@/components/AddPostButton/PostButton";
import { AddPostModal } from "@/components/Modals/AddPost";
import Loader from "@/components/Loader";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Dislike() {
  const [modal, setModal] = useState(false);
  const { data: session, status } = useSession();

  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    ['query'],
    async ({ pageParam = 1 }) => {
      const response = await getPosts('dislike', session?.token, pageParam);
      return response;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        console.log('lastPage: ', lastPage);
        console.log('allPages: ', allPages);

        // Check if there is a next page available
        if (lastPage?.next) {
          return allPages.length + 1;
        }

        // If there is no next page, return undefined
        return undefined;
      },
    }
  );




  const addPost = () => {
    setModal(!modal);
  };

  return (
    <main
      style={{
        backgroundColor: "#131313",
        color: "white",
        height: "100%",
      }}
    >
      <div className="postHeaderDislike">
        <IoHeartDislikeOutline size={35} color="white" />
      </div>
      <div className="post-container">
        <InfiniteScroll
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          loader={<Loader width={98} height={56} />}
          dataLength={
            data?.pages.count || 0
          }
        >
          {data?.pages.map((posts, id) => (
            <Fragment key={id}>
              {posts?.results.map((post) => (
                <Post key={post.id} post={post} type='dislike' />
              ))}
            </Fragment>

          ))}
        </InfiniteScroll>
      </div>
      <AddPostBtn onClick={addPost} type="dislike" />
      {modal && <AddPostModal onClick={addPost} type='dislike' />}
    </main>
  );
}
