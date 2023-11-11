"use client";

import Loader from "@/components/Loader";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPosts } from "@/lib/get-posts";
import { Post } from "../Posts";
import { Fragment, useEffect } from "react";



export const Posts = async ({ typePost, author, token }) => {



    const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
        ['query'],
        async ({ pageParam = 1 }) => {
            const response = await getPosts(typePost, token, pageParam, author);
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
        <>

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
                            <Post key={post.id} post={post} type={typePost} />
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
        </>
    );

}