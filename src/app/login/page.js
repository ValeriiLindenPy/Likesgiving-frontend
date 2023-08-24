"use client";
import styles from './login.module.css'
import { logIn} from '@/redux/features/auth-slice'
import { useSelector, useDispatch } from 'react-redux'
import { redirect } from 'next/navigation';
import Image from 'next/image'
import { useFormik } from 'formik';
import { basicSchema } from '@/schemas';
import { handleLogin } from '../api/auth/apilog';



export default function LogIn() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: basicSchema,
    onSubmit: async (values, actions) => {
      await handleLogin(values.email, values.password);
      const token = await localStorage.getItem('token');
      if (token) {
        dispatch(logIn(token));
        alert("Success");
      }else {
        alert('Bad!');
      }

      actions.resetForm();
    },
  })

  console.log(formik.errors)


  if (isAuth)
  	return redirect('/');

  

  return (
    <main className = {styles.main}>
    <div className = {styles.form}>
    <Image src='/logo.png' width={122} height={100} alt='Logo' />

    <h1>Log In</h1>
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
