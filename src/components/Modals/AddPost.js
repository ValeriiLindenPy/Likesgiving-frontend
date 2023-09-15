"use client";
import { AiFillCloseCircle } from "react-icons/ai";
import { useFormik } from 'formik';
import styles from './AddPost.module.css'
import api from "@/app/api/auth/baseaxios";
import { addPostSchema } from '@/schemas';
import { useSession } from "next-auth/react";




export const AddPostModal = ({ onClick, type }) => {
    const { data: session } = useSession();

    const formik = useFormik({
        initialValues: {
            emotion: '',
            text: '',
            picture: '',
        },
        validationSchema: addPostSchema,
        onSubmit: async (values, actions) => {
            try {

                const config = {
                    headers: {
                        'Authorization': `Token ${session?.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                };
                const response = await api.post('posts/create_post/', {
                    post_type: type,
                    emotion: values.emotion,
                    text: values.text,
                    picture: values.picture,
                }, config);

                if (response.error) {
                    // Handle error if authentication fails
                    console.log(response.error)
                }

                onClick();

                actions.resetForm();
            } catch (error) {
                // Handle error if sign-in throws an exception
                onClick();
                console.log(error)
            }
        },
    })


    return (
        <>
            <div className={styles.modal}>

                <div className={styles.overlay}>


                    <div className={styles.modalContent}>
                        <button type='button' onClick={onClick} className={styles.closeModal}>
                            <AiFillCloseCircle size={30} />
                        </button>


                        <form style={{
                            paddingTop: '20px',
                        }} onSubmit={formik.handleSubmit} autoComplete='off' encType="multipart/form-data">

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
                                onRemove={() => {
                                    formik.setFieldValue('picture', null)
                                }}
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