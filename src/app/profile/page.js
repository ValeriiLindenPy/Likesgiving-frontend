"use client";
import api from '../api/auth/baseaxios'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SetStatus } from '@/redux/features/auth-slice';
import styles from './Profile.module.css'
import Image from 'next/image';



export default function Profile() {
    const { data: session } = useSession();
    const likeStatus = useSelector((state) => state.auth.likeStatus)
    const dispatch = useDispatch()
    const config = {
        headers: {
            'Authorization': `Token ${session?.token}`,
        },
    }


    const { data, isError, isLoading } = useQuery({
        queryKey: ['ProfileData'],
        queryFn: async () => {
            const response = await api.get('/auth/profile/', config)
            return response.data;
        }
    });



    useEffect(() => {
        async function fetchData() {
            if (data?.statistics.dislike_posts > data?.statistics.like_posts) {
                dispatch(SetStatus('Disliker'));
            } else {
                dispatch(SetStatus('Liker'));
            }
        }

        fetchData(); // Call the async function immediately

    }, [data?.statistics]);



    if (isLoading) return <Loader width={89} height={56} />



    return (
        <>
            <main style={{
                height: '100vh',
            }} className={likeStatus === 'Disliker' ? styles.blackbg : ''}>
                <div className={styles.profileContainer}>
                    <div className={styles.profilePhotoContainer}>
                        <Image className={styles.profilePhoto} src={data?.profile_picture} width={180} height={150} alt='profile-photo' />
                    </div>
                    <div className={styles.profileName}>
                        <h1>{data?.user_name}</h1>
                    </div>
                    <div className={styles.profileStat}>
                        <h2>{data?.statistics.like_posts} L : {data?.statistics.dislike_posts} D</h2>
                    </div>
                </div>

            </main>

        </>

    );
}