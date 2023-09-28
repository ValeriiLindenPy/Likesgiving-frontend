"use client";

import Date from '../Date';
import styles from './Comment.module.css'
import Image from 'next/image';




export const CommentComponent = ({ comment, type }) => {


    return (
        <>
            <div className={styles.container}>
                <div className={styles.CommentBody}>
                    <div className={styles.authorImgContainer}>
                        <Image className={styles.authorImg} src={comment.user.profile_picture} width={40} height={40} alt='author_profile_picture' />
                    </div>
                    <div className={styles.CommentContent}>
                        <div className={styles.authorName}>
                            <p>{comment.user.user_name}</p>
                        </div>
                        <div className={styles.date}>
                            <p><Date dateString={comment.date_created} /></p>
                        </div>

                        <div className={type === 'dislike' ? styles.textblack : styles.text}>
                            <p>{comment.text}</p>
                        </div>


                    </div>
                </div>
            </div>

        </>
    );
}