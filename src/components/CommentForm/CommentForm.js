"use client";

import { useFormik } from 'formik';
import styles from './CommentForm.module.css'
import api from '@/app/api/auth/baseaxios';






export const CommentFormComponent = ({ type, token, post }) => {
    const formik = useFormik({
        initialValues: {
            text: '',
        },
        onSubmit: async (values, actions) => {
            try {

                const config = {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                    params: { post: post },
                };
                const response = await api.post(`posts/v1/comment/`, {
                    text: values.text,
                    post: post
                }, config);

                console.log(response);

                if (response.status === 201) {

                }

                if (response.error) {
                    // Handle error if authentication fails
                    console.log(response.error)
                }



                actions.resetForm();
            } catch (error) {
                // Handle error if sign-in throws an exception
                console.log(error)
            }
        },
    });




    return (
        <>
            <div className={styles.container}>
                <div className={styles.CommentBody}>
                    <div className={styles.CommentContent}>
                        <form onSubmit={formik.handleSubmit} autoComplete='off' className={styles.form}>
                            <div>
                                <label className={styles.label} htmlFor="text">Add your comment:</label>
                                <textarea
                                    rows="7"
                                    cols="50"
                                    id="text"
                                    name="text"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.text}
                                    onBlur={formik.handleBlur}
                                    placeholder='Text...'
                                    className={styles.area}

                                />
                            </div>

                            <button className={type === 'dislike' ? styles.buttonBlack : styles.button} type='button' onClick={formik.handleSubmit}>SEND</button>

                        </form>

                    </div>
                </div>
            </div>

        </>
    );
}