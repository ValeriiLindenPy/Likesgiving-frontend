"use client";
import styles from './forgotPassword.module.css'
import Image from 'next/image'
import { useFormik } from 'formik';
import { paswwordForgot } from '@/schemas';
import api from '../api/auth/baseaxios';




export default function ForgotPassword() {


  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: paswwordForgot,
    onSubmit: async (values, actions) => {
      console.log(values.email);
      try {
        await api.post('/auth/password_reset/', {
          'email': values.email,
        });


        console.log('done');


        actions.resetForm();


      } catch (error) {
        console.log(error);
        // Handle error if any exception occurs during the try block


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

          <button disabled={formik.isSubmitting} type='submit'>Reset password</button>
        </form>
      </div>
    </main>
  )
}
