"use client";
import styles from './forgotPassword.module.css';
import Image from 'next/image';
import { useFormik } from 'formik';
import { paswwordForgot } from '@/schemas';
import useSWR, { mutate } from 'swr';

const fetcher = async (url, email) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export default function ForgotPassword() {
  const { data, error, mutate: mutateData } = useSWR(
    'https://ihl-project-606adf7a8500.herokuapp.com/auth/password_reset/',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: paswwordForgot,
    onSubmit: async (values, actions) => {
      try {
        // Trigger a re-fetch when the form is submitted
        await mutate('https://ihl-project-606adf7a8500.herokuapp.com/auth/password_reset/', async () => {
          await fetcher('https://ihl-project-606adf7a8500.herokuapp.com/auth/password_reset/', values.email);
        });

        console.log('done');
        actions.resetForm();
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
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
  );
}
