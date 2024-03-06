"use client";

import { useFormik } from 'formik';
import styles from './CommentForm.module.css';

export const CommentFormComponent = ({ type, token, post }) => {
    const formik = useFormik({
        initialValues: {
            text: '',
        },
        onSubmit: async (values, actions) => {
            try {
                const formData = new FormData();
                formData.append('text', values.text);
                formData.append('post', post);

                const config = {
                    method: 'POST',
                    cache: "force-cache",
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                    body: formData,
                };

                const response = await fetch(`https://ihl-project-606adf7a8500.herokuapp.com/posts/v1/comments/?post=${post}`, config);
                const responseData = await response.json();

  

                if (response.ok) {
                    // Handle success
                } else {
                    // Handle error

                }

                actions.resetForm();
            } catch (error) {
                // Handle error

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
};
