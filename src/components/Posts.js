"use client";

import Image from 'next/image';
import styles from './Posts.module.css'
import Date from './Date';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { makeLike } from '@/lib/makeLike';
import { BiComment } from "react-icons/bi";
import { formatNumber } from '@/lib/numberFormate';
import Link from 'next/link';
import defaultProfilePic from '../app/assets/profilepic.png'



export const Post = ({ post, type }) => {


    const { data: session } = useSession();
    const [likeNumber, setLikeNumber] = useState(post?.likes?.length)
    const [CommentsNumber, setCommentsNumber] = useState(post?.post_comments?.length)
    const likesStatus = post?.likes?.includes(Number(session?.sub))
    const [isLiked, setIsLiked] = useState(likesStatus)
    const [liked, setLiked] = useState(isLiked);
    const commentURL = `/${type}/comments/${post?.id}`;




    const handleLikeToggle = async () => {
        setLiked((prevLiked) => !prevLiked);
        setLikeNumber((prevLikeNumber) => (liked ? prevLikeNumber - 1 : prevLikeNumber + 1));
        await makeLike(post.id, session?.token)
    };


    useEffect(() => {
        if (isLiked) {
            setLiked(isLiked);
        }
    }, []);
    



    try {

        return (
            <div>

                <div key={post.id} className={type === 'like' ? styles.postLike : styles.postDisike}>
                    <article>
                        <div className={styles.postLikeAuthor}>
                            <Image className={styles.authorImg} src={post.author.profile_picture ? post.author.profile_picture : defaultProfilePic
                            } width={40} height={40} alt='author_profile_picture
                                ' />

                        </div>

                        <div className={styles.postData}>
                            <div className={styles.authorName}>
                                <p>{post.author.user_name}</p>
                            </div>

                            <div className={styles.emotion}>
                                <p>Emotion: {post.emotion}</p>
                            </div>

                            <div className={styles.text}>
                                <p style={type === 'dislike' ? { color: 'white' } : { color: '#131313' }}>{post.text}</p>
                            </div>


                            <div className={styles.postImg}>
                                {post.picture !== null && <Image src={post.picture} width={600} height={400}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        maxWidth: '400px',
                                        borderRadius: '15px',
                                    }} alt='post-img' priority />}
                            </div>

                            <div className={type === 'like' ? styles.postItems : styles.postItemsDislike}>
                                <div className={styles.itemsContent}>
                                    <div className={styles.postDate}>
                                        <p><Date dateString={post.date_created} /></p>
                                    </div>
                                    {type === 'like' ? <div className={styles.postLikes}>
                                        {liked ? (
                                            <IoHeart
                                                color='black'
                                                size={25}
                                                onClick={handleLikeToggle}
                                            />
                                        ) : (
                                            <IoHeartOutline
                                                size={25}
                                                onClick={handleLikeToggle}
                                            />
                                        )}
                                        <p style={{ paddingLeft: '2px' }}>{likeNumber}</p>
                                    </div> : <div className={styles.postLikes}>
                                        {liked ? (
                                            <IoHeart
                                                color='white'
                                                size={25}
                                                onClick={handleLikeToggle}
                                            />
                                        ) : (
                                            <IoHeartOutline
                                                size={25}
                                                onClick={handleLikeToggle}
                                            />
                                        )}
                                        <p style={{ paddingLeft: '2px' }}>{likeNumber}</p>
                                    </div>}
                                    <div className={styles.postComment}>
                                        <Link style={{
                                            textDecoration: 'none',
                                            color: 'black',
                                            display: 'flex',
                                        }} href={commentURL}><BiComment
                                                size={24} color={type === 'dislike' ? 'white' : 'black'}
                                            />
                                        </Link>
                                        <p style={{ paddingLeft: '2px' }}>{formatNumber(CommentsNumber)}</p>
                                    </div>
                                </div>

                            </div>



                        </div>

                    </article>
                </div>

            </div>
        );
    } catch (error) {
  
        return <p>Error fetching posts</p>; // You can provide a fallback UI for the error case
    }
};
