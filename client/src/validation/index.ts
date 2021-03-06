import * as yup from "yup";

//Minimum eight characters, at least one letter, one number and one special character
const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const roleRegEx = /employer|employee/
const phonNumberRegEx = /[+]374[0-9]{8}/

export const signUpSchema = yup.object().shape({
  fname: yup
    .string()
    .required("this field is required"),
  lname: yup
    .string()
    .required("this field is required"),
  role: yup
    .string()
    .required()
    .matches(roleRegEx),
  phoneNumber: yup
    .string()
    .required()
    .max(12)
    .matches(phonNumberRegEx),
  email: yup
    .string()
    .email("email is wrong")
    .required("this field is required"),
  password: yup
    .string()
    .required("this field is required")
    .matches(passwordRegEx, "password is not match"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("email is wrong")
    .required("this field is required"),
  password: yup
    .string()
    .required("this field is required")
    .matches(passwordRegEx, "password is not match"),
});