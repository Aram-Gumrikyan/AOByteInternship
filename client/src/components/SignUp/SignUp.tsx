import React, { FC, useEffect } from "react";
import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import classNames from "classnames";

import { ISignUpForm, Role, IState } from "../../interfaces";
import { signUpSchema } from "../../validation";
import { fetchSignUp } from "../../features/user/api";
import { resetSignUpData } from "../../features/user/userSlice";
import Loading from "../Loading";
import Error from "../Error"
import styles from "./SignUp.module.scss";

const SignUp: FC = () => {
  const { loading, created, error } = useSelector((state: IState) => state.user.signUp);
  const dispatch = useDispatch();
  const history = useHistory();

  const signUpClassName = classNames(
    styles.signup,
    { error: error }
  );

  useEffect(() => {
    if (created) {
      history.push('/login');
    }

    return () => {
      dispatch(resetSignUpData());
    }
  }, [created, history]);

  const formik = useFormik<ISignUpForm>({
    initialValues: {
      fname: '',
      lname: '',
      role: '',
      phoneNumber: '',
      email: '',
      password: '',
    },
    validateOnBlur: true,
    validateOnChange: false,
    validateOnMount: false,
    // validationSchema: signUpSchema,
    onSubmit: values => {
      dispatch(fetchSignUp(values));
    },
  });

  const { fname, lname, phoneNumber, email, password } = formik.errors;

  return (
    <div className={signUpClassName}>
      {error && <Error status={error} />}
      {loading && <Loading />}
      <Form onSubmit={formik.handleSubmit} className={styles.form}>
        <Form.Group>
          <Form.Input
            id="fname"
            name="fname"
            type="text"
            label="first name"
            autoComplete="on"
            onChange={formik.handleChange}
            value={formik.values.fname}
            error={fname && true}
          />
          <Form.Input
            id="lname"
            name="lname"
            type="text"
            label="last name"
            autoComplete="on"
            onChange={formik.handleChange}
            value={formik.values.lname}
            error={lname && true}
          />
        </Form.Group>
        <Form.Group className={styles.group}>
          <div className={styles.roleSelector}>
            <label htmlFor="role" className={styles.label}>role</label>
            <select
              id="role"
              name="role"
              onChange={formik.handleChange}
              value={formik.values.role}
            >
              <option value=''></option>
              <option value={Role.EMPLOYER}>{Role.EMPLOYER}</option>
              <option value={Role.EMPLOYEE}>{Role.EMPLOYEE}</option>
            </select>
          </div>
          <Form.Input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            label="phone number"
            autoComplete="on"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
            error={phoneNumber && true}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            id="email"
            name="email"
            type="email"
            label="email"
            autoComplete="on"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={email && true}
          />
          <Form.Input
            id="password"
            name="password"
            type="password"
            label="password"
            autoComplete="off"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={password && true}
            title="Minimum eight characters, at least one letter, one number and one special character"
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Button
            primary
            type="submit"
            className={styles.submitButton}
          >Submit</Form.Button>
        </Form.Group>
      </Form>
    </div >
  );
}

export default SignUp;