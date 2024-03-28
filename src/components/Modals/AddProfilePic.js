"use client";
import { AiFillCloseCircle } from "react-icons/ai";
import { useFormik } from 'formik';
import styles from './AddPost.module.css'
import { changePicSchema } from '@/schemas';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const AddProfilePic = ({ onClick }) => {
    const { data: session } = useSession();

    const formik = useFormik({
        initialValues: {
            picture: null,
        },
        validationSchema: changePicSchema,
        onSubmit: async (values, actions) => {
            try {
                const formData = new FormData();

                // Check if the 'picture' field is provided before appending it
                if (values.picture) {
                    formData.append('picture', values.picture);
                }

                const response = await fetch('https://ihl-project-606adf7a8500.herokuapp.com/auth/edit-profile/', {
                    method: 'POST',
                    cache: "force-cache",
                    headers: {
                        'Authorization': `Token ${session?.token}`,
                    },
                    body: formData,
                });

                const responseData = await response.json();


                if (response.status === 201) {
                    return redirect('/profile' + type);
                }

                if (responseData.error) {

                }

                actions.resetForm();
            } catch (error) {
                // Handle error if sign-in throws an exception
                onClick();

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

                            <button className={styles.button} disabled={formik.isSubmitting} type='submit'>Change picture</button>
                        </form>



                    </div>
                </div>
            </div>
        </>
    );
}
