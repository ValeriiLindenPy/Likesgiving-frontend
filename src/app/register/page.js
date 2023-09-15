"use client";
import styles from './register.module.css'
import Image from 'next/image'
import { useFormik } from 'formik';
import { signUpSchema } from '@/schemas';
import { signIn, useSession } from 'next-auth/react';
import api from '../api/auth/baseaxios';




export default function SignUp() {
  const { data: session, status } = useSession();

  const formik = useFormik({
    initialValues: {
      user_name: '',
      email: '',
      password: '',
      re_password: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (values, actions) => {
      try {
        const createUserResponse = await api.post('/auth/create/', {
          user_name: values.user_name,
          email: values.email,
          password: values.password,
        });

        if (createUserResponse.status === 201) {
          // User was successfully created, now proceed with signIn
          const response = await signIn('credentials', {
            email: values.email,
            password: values.password,
            callbackUrl: 'http://localhost:4000/'
          });



          actions.resetForm();
        }

      } catch (error) {
        // Handle error if any exception occurs during the try block
        if (error.response && error.response.data) {
          const responseData = error.response.data;

          // Check if the 'email' field has an error message
          if (responseData.email && Array.isArray(responseData.email) && responseData.email.length > 0) {
            formik.setFieldError('email', responseData.email[0]);
          }

          // Check if the 'user_name' field has an error message
          if (responseData.user_name && Array.isArray(responseData.user_name) && responseData.user_name.length > 0) {
            formik.setFieldError('user_name', responseData.user_name[0]);
          }

          // Handle other errors or show a generic error message
        } else {
          console.log(responseData)
          // Handle non-response errors, e.g., network issues
        }

      }
    },
  });




  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <Image src='/logo.png' width={127} height={108} alt='logo' />
        <h1 className='logo-font'>Likesgiving</h1>
        <form onSubmit={formik.handleSubmit} autoComplete='off'>
          <input
            id="user_name"
            name="user_name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.user_name}
            onBlur={formik.handleBlur}
            placeholder='Username'
            className={formik.errors.user_name && formik.touched.user_name ? styles.error : ""}
          />
          {formik.errors.user_name && formik.touched.user_name && <p className={styles.errorlabel}>{formik.errors.user_name}</p>}
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            placeholder='Email'
            className={formik.errors.email && formik.touched.email ? styles.error : ""}
          />
          {formik.errors.email && formik.touched.email && <p className={styles.errorlabel}>{formik.errors.email}</p>}
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            placeholder='Password'
            className={formik.errors.password && formik.touched.password ? styles.error : ""}
          />
          {formik.errors.password && formik.touched.password && <p className={styles.errorlabel}>{formik.errors.password}</p>}
          <input
            id="re_password"
            name="re_password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.re_password}
            onBlur={formik.handleBlur}
            placeholder='Confirm password'
            className={formik.errors.re_password && formik.touched.re_password ? styles.error : ""}
          />
          {formik.errors.re_password && formik.touched.re_password && <p className={styles.errorlabel}>{formik.errors.re_password}</p>}
          <button disabled={formik.isSubmitting} type='submit'>Sign up</button>
        </form>
      </div>
    </main>
  )
}