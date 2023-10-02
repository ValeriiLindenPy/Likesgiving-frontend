import * as yup from 'yup';



const passRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})/;

export const signInSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required('Required'),
    password: yup.string().min(8).matches(passRules, { message: "Don't worry, but password must be strong" }).required('Required'),
});


export const signUpSchema = yup.object().shape({
    user_name: yup.string().max(30).required('Required'),
    email: yup.string().email("Please enter a valid email").required('Required'),
    password: yup.string().min(8).matches(passRules, { message: "Don't worry, but password must be strong" }).required('Required'),
    re_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match my friend)').required('Required'),
});


export const paswwordForgot = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required('Required'),
});


export const confirmPassword = yup.object().shape({
    password: yup.string().min(8).matches(passRules, { message: "Don't worry, but password must be strong" }).required('Required'),
    re_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match my friend)').required('Required'),
});

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const validFileExtensions = { image: ['jpg', 'png', 'jpeg', 'webp'] };

function isValidFileType(fileName, fileType) {
    if (!fileName) return false;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    return validFileExtensions[fileType].indexOf(fileExtension) > -1;
}

export const addPostSchema = yup.object().shape({
    text: yup.string().max(1000).required('Please write something'),
    emotion: yup.string().max(30).required('Your emotion is important'),
    picture: yup.mixed()
        .nullable()
        .test("is-valid-picture", "Please upload a valid image (jpg, png, jpeg, webp) with a maximum size of 20Mb", (value) => {
            if (!value) {
                return true; // No picture provided, so no validation needed.
            }
            // Validation for picture type and size
            return isValidFileType(value.name, ["jpg", "png", "jpeg", "webp"]) && value.size <= MAX_FILE_SIZE;
        }),
});

