"use client";
import styles from './login.module.css'
import Image from 'next/image'
import { useFormik } from 'formik';
import { signInSchema } from '@/schemas';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';


export default function LogIn() {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await signIn('credentials', {
          email: values.email,
          password: values.password,
          callbackUrl: 'https://thanksgiving-j6r1q1qck-valeriis-projects-0ac1b84e.vercel.app/'
        });

        if (response.error) {
          // Handle error if authentication fails
          console.log(response.error)
        }

        actions.resetForm();
      } catch (error) {

      }
    },
  })





  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <Image src='/logo.png' width={137} height={108} alt='logo' priority />
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
          <div style={{
            textAlign: 'right',
          }}>
            <Link className={styles.customLink} href='/forgot-password'>Forgot password?</Link>
          </div>
          <button disabled={formik.isSubmitting} type='submit'>Log In</button>
        </form>
        <div className={styles.signUp} style={{
          display: 'flex'
        }}>
          <p style={{

            fontSize: '20px'
          }}>{"Don`t have an account"}</p> <Link href='/register' style={{
            color: 'black',
            paddingLeft: '3px',
            fontSize: '20px',
            fontWeight: '700',
          }}>Sign-Up</Link>
        </div>
      </div>
    </main>
  )
}
