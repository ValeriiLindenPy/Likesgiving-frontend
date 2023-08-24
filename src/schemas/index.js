import * as yup from 'yup';



const passRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})/;

export const basicSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required('Required'),
    password: yup.string().min(8).matches(passRules, {message: "Don't worry ,but password must be strong"}).required('Required'),


});

