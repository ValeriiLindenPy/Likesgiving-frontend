"use client";
import { useSession } from "next-auth/react";
import { Post } from '@/components/Posts'
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { AddPostBtn } from "@/components/AddPostButton/PostButton";
import { Fragment, useEffect, useState } from "react";
import { AddPostModal } from "@/components/Modals/AddPost";
import Loader from "@/components/Loader";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPosts } from "@/lib/get-posts";



export default function Like() {
  const [modal, setModal] = useState(false);
  const { data: session, status } = useSession();





  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    ['query'],
    async ({ pageParam = 1 }) => {
      const response = await getPosts('like', session?.token, pageParam);
      return response;
    },
    {
      getNextPageParam: (lastPage, allPages) => {

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


  useEffect(() => {
    // Check if the user has scrolled to the bottom of the page
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // If at the bottom and there is a next page, fetch it
        if (hasNextPage) {
          fetchNextPage();
        }
      }
    };

    // Add the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Remove the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, fetchNextPage]);



  return (
    <main>
      <div className="postHeader">
        <IoHeartOutline size={35} />

      </div>
      <div className="post-container">
        <InfiniteScroll
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          dataLength={
            data?.pages.count || 0
          }
        >
          {data?.pages.map((posts, id) => (
            <Fragment key={id}>
              {posts?.results.map((post) => (
                <Post key={post.id} post={post} type='like' />
              ))}
            </Fragment>

          ))}
        </InfiniteScroll>
        {isLoading || isFetchingNextPage && <div style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Loader width={98} height={56} sm={true} />

        </div>}

      </div>

      <AddPostBtn onClick={addPost} type='like' />

      {modal && <AddPostModal onClick={addPost} type='like' />}



    </main>

  );

}
