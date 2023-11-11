"use client";

import api from '../api/auth/baseaxios';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, Fragment } from 'react';
import { SetStatus } from '@/redux/features/auth-slice';
import styles from './Profile.module.css';
import Image from 'next/image';
import { Post } from '@/components/Posts';
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPosts } from '@/lib/get-posts';


export default function Profile() {
    const { data: session } = useSession();
    const likeStatus = useSelector((state) => state.auth.likeStatus);
    const dispatch = useDispatch();
    const [postType, setType] = useState('like');

    const config = {
        headers: {
            'Authorization': `Token ${session?.token}`,
        },
    };

    const { data: profileData } = useQuery({
        queryKey: ['ProfileData'],
        queryFn: async () => {
            const response = await api.get('/auth/profile/', config);
            return response.data;
        }
    });


    const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage, isError } = useInfiniteQuery(
        ['query', postType],
        async ({ pageParam = 1 }) => {
            const response = await getPosts(postType, session?.token, pageParam, profileData?.id);
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
        async function fetchData() {
            if (profileData?.statistics.dislike_posts > profileData?.statistics.like_posts) {
                dispatch(SetStatus('Disliker'));
            } else {
                dispatch(SetStatus('Liker'));
            }
        }
        fetchData();
    }, [profileData?.statistics]);


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

    console.log(likeStatus);



    return (
        <>
            <main className={likeStatus === 'Disliker' ? styles.blackbg : ''}>
                <div className={styles.profileContainer}>
                    <div className={styles.profilePhotoContainer}>
                        <Image className={styles.profilePhoto} src={profileData?.profile_picture} width={180} height={150} alt='profile-photo' />
                    </div>
                    <div className={styles.profileName}>
                        <h1>{data?.user_name}</h1>
                    </div>
                    <div className={styles.profileStat}>
                        <h2>{profileData?.statistics.like_posts} L : {profileData?.statistics.dislike_posts} D</h2>
                    </div>


                    <div className={likeStatus === 'Disliker' ? styles.blackbg : styles.whitebg}>
                        <div className={likeStatus === 'Disliker' ? styles.switchButtosBlack : styles.whitebg}>
                            <div className={`${styles.btnlike} ${postType === 'like' ? styles.active : ''}`}>
                                <button onClick={() => setType('like')} type='button'>Like</button>
                            </div>
                            <div className={`${styles.btndislike} ${postType === 'dislike' ? styles.active : ''}`}>
                                <button onClick={() => setType('dislike')} type='button'>Dislike</button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.posts}>
                        {isLoading ? (
                            <Loader width={89} height={56} />
                        ) : isError ? (
                            <p>Error loading posts</p>
                        ) : (
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
                                            (postType === 'like' ? <Post key={post.id} post={post} type={postType} /> : <Post key={post.id} post={post} type={postType} />)
                                        ))}

                                    </Fragment>



                                ))}
                            </InfiniteScroll>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
