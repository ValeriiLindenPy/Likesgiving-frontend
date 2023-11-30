"use client";
import styles from './PCC.module.css';
import Image from 'next/image';
import { useFormik } from 'formik';
import { confirmPassword } from '@/schemas';
import { redirect, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ChangePasswordConfirm() {
  const searchParams = useSearchParams();
  const [changeStatus, setChangeStatus] = useState(false);
  const tokenEmail = searchParams.get('token');
  const [redirected, setRedirected] = useState(false);

  const handleRedirect = () => {
    setRedirected(true);
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      re_password: '',
    },
    validationSchema: confirmPassword,
    onSubmit: async (values, actions) => {
      try {
        const config = {
          method: 'PUT',
          cache: "force-cache",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${tokenEmail}`,
          },
          body: JSON.stringify({
            password: values.password,
          }),
        };

        const changePassword = await fetch('https://ihl-project-606adf7a8500.herokuapp.com/auth/password_reset_confirm/', config);

        console.log(changePassword.status);

        if (changePassword.status === 200) {
          setChangeStatus(true);
          setRedirected(true);
        }

        actions.resetForm();

      } catch (error) {
        // Handle error if any exception occurs during the try block
        console.log(error);
      }
    },
  });

  if (redirected) {
    return redirect('/login');
  }

  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <Image src='/logo.png' width={127} height={108} alt='logo' />
        <h1 className='logo-font'>Likesgiving</h1>
        {!changeStatus ? (
          <form onSubmit={formik.handleSubmit} autoComplete='off'>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              placeholder='New password'
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
              placeholder='Confirm new password'
              className={formik.errors.re_password && formik.touched.re_password ? styles.error : ""}
            />
            {formik.errors.re_password && formik.touched.re_password && <p className={styles.errorlabel}>{formik.errors.re_password}</p>}
            <button disabled={formik.isSubmitting} type='submit'>Change password</button>
          </form>
        ) : (
          <>
            <h2>Password Changed</h2>
            <br></br>
            <button onClick={handleRedirect} type='submit'>Go to login</button>
          </>
        )}
      </div>
    </main>
  );
}
