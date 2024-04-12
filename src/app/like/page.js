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
import { FaUserAlt } from 'react-icons/fa';
import Link from "next/link";


export default function Like() {
  const [modal, setModal] = useState(false);
  const { data: session, status } = useSession();
  const [isAtTop, setIsAtTop] = useState(true);






  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
    ['query'],
    async ({ pageParam = 1 }) => {
      const response = await getPosts('like', session?.token, pageParam);
      return response;
    },
    {
      getNextPageParam: (lastPage, allPages) => {

 
        if (lastPage?.next) {
          return allPages.length + 1;
        }

        
        return undefined;
      },
    }
  );




  const addPost = () => {
    setModal(!modal);
  };


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsAtTop(false);
      } else {
        setIsAtTop(true);
      }
  
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (hasNextPage) {
          fetchNextPage();
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, fetchNextPage]);
  
  useEffect(() => {

  }, [isAtTop]);
  



  return (
    <main>
      <div className="postHeader">
        <IoHeartOutline size={35} />
        {isAtTop ? <Link style={{
          color: 'black',
          textDecoration: 'none'
        }} href="/profile"><FaUserAlt className= "userIconMobile" size={30} /></Link>: <></>}

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
