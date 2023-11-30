"use client";

import Date from '../Date';
import styles from './Comment.module.css'
import Image from 'next/image';
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from '../Loader';
import { Fragment, useEffect } from 'react';




export const CommentComponent = ({ token, idPost, type }) => {



    const getData = async (pageParam) => {

        try {
            console.log(pageParam)
            const url = `https://ihl-project-606adf7a8500.herokuapp.com/posts/v1/comments/?page=${pageParam}&post=${idPost}`;
            const response = await fetch(url, {
                cache: "force-cache",
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });


            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }



    const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
        ['query'],
        async ({ pageParam = 1 }) => {
            const response = await getData(pageParam);
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
                    data?.pages[0]?.count || 0
                }
                scrollThreshold={1}
                scrollableTarget="scrollableDiv"
            >
                {data?.pages.map((comments, id) => (
                    <Fragment key={id}>
                        {comments?.results.map((comment) => (
                            <div key={comment?.id} className={styles.container}>
                                <div className={styles.CommentBody}>
                                    <div className={styles.authorImgContainer}>
                                        <Image className={styles.authorImg} src={comment.user?.profile_picture} width={40} height={40} alt='author_profile_picture' />
                                    </div>
                                    <div className={styles.CommentContent}>
                                        <div className={styles.authorName}>
                                            <p>{comment.user?.user_name}</p>
                                        </div>
                                        <div className={styles.date}>
                                            <p><Date dateString={comment?.date_created} /></p>
                                        </div>

                                        <div className={type === 'dislike' ? styles.textblack : styles.text}>
                                            <p>{comment?.text}</p>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        ))}
                    </Fragment>

                ))}
            </InfiniteScroll>


        </>
    );
}