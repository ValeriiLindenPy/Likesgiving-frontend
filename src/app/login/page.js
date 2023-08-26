"use client";
import styles from './login.module.css'
import Image from 'next/image'
import { useFormik } from 'formik';
import { basicSchema } from '@/schemas';




export default function  LogIn() {
  const token = localStorage.getItem('token');
  



  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: basicSchema,
    onSubmit: async (values, actions) => {
      await handleLogin(values.email, values.password);
 

      actions.resetForm();
    },
  })

  console.log(formik.errors)




  

  return (
    <main className = {styles.main}>
    <div className = {styles.form}>
    <Image src='/logo.png' width={200} height={130} alt='Logo' />
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
