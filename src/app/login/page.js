"use client";
import styles from './login.module.css'
import Image from 'next/image'
import { useFormik } from 'formik';
import { basicSchema } from '@/schemas';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'



export default function LogIn() {
  const { data: session, status } = useSession();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: basicSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await signIn('credentials', {
          email: values.email,
          password: values.password,
          callbackUrl: 'http://localhost:4000/'
        });

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
  })





  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <Image src='/logo.png' width={167} height={138} />
        <h1 className='logo-font'>Likesgiving</h1>
        <form onSubmit={formik.handleSubmit} autoComplete='off'>
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
          <button disabled={formik.isSubmitting} type='submit'>Log In</button>
        </form>
      </div>
    </main>
  )
}
