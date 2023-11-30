"use client";
import { AiFillCloseCircle } from "react-icons/ai";
import { useFormik } from 'formik';
import styles from './AddPost.module.css'
import { addPostSchema } from '@/schemas';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const AddPostModal = ({ onClick, type }) => {
    const { data: session } = useSession();

    const formik = useFormik({
        initialValues: {
            emotion: '',
            text: '',
            picture: null,
        },
        validationSchema: addPostSchema,
        onSubmit: async (values, actions) => {
            try {
                const formData = new FormData();

                // Add the fields to the FormData object
                formData.append('post_type', type);
                formData.append('emotion', values.emotion);
                formData.append('text', values.text);

                // Check if the 'picture' field is provided before appending it
                if (values.picture) {
                    formData.append('picture', values.picture);
                }

                const response = await fetch('https://ihl-project-606adf7a8500.herokuapp.com/posts/v1/posts/', {
                    method: 'POST',
                    cache: "force-cache",
                    headers: {
                        'Authorization': `Token ${session?.token}`,
                    },
                    body: formData,
                });

                const responseData = await response.json();

                console.log(responseData);

                if (response.status === 201) {
                    return redirect('/' + type);
                }

                if (responseData.error) {
                    // Handle error if authentication fails
                    console.log(responseData.error);
                }

                actions.resetForm();
            } catch (error) {
                // Handle error if sign-in throws an exception
                onClick();
                console.log(error);
            }
        },
    });

    return (
        <>
            <div className={styles.modal}>

                <div className={styles.overlay}>

                    <div className={styles.modalContent}>
                        <button type='button' onClick={onClick} className={styles.closeModal}>
                            <AiFillCloseCircle size={30} />
                        </button>

                        <form
                            style={{ paddingTop: '20px' }}
                            onSubmit={formik.handleSubmit}
                            autoComplete='off'
                            encType="multipart/form-data"
                        >
                            <input
                                id="emotion"
                                name="emotion"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.emotion}
                                onBlur={formik.handleBlur}
                                placeholder='Emotion'
                                className={formik.errors.emotion && formik.touched.emotion ? styles.error : styles.inputField}
                            />
                            {formik.errors.emotion && formik.touched.emotion && <p className={styles.errorlabel}>{formik.errors.emotion}</p>}

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
                                className={formik.errors.text && formik.touched.text ? styles.error : styles.inputField}
                            />
                            {formik.errors.text && formik.touched.text && <p className={styles.errorlabel}>{formik.errors.text}</p>}

                            <input
                                accept="image/*"
                                id="picture"
                                name="picture"
                                type="file"
                                onChange={(e) => formik.setFieldValue('picture', e.currentTarget.files[0])}
                                onBlur={() => formik.setFieldTouched('picture')}
                                placeholder='Add photo'
                                className={formik.errors.picture && formik.touched.picture ? styles.uploadFieldError : styles.uploadField}
                            />
                            {formik.errors.picture && formik.touched.picture && <p className={styles.errorlabel}>{formik.errors.picture}</p>}

                            <button className={styles.button} disabled={formik.isSubmitting} type='submit'>ADD POST</button>
                        </form>



                    </div>
                </div>
            </div>
        </>
    );
}
