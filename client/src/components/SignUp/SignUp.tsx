import { FC, useEffect } from "react";
import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import classNames from "classnames";

import { ISignUpForm, IState } from "../../interfaces";
import { fetchSignUp, clearData } from "../../features/signUp/signUpSlice"
import { signUpSchema } from "../../validation";
import Loading from "../Loading";
import styles from "./SignUp.module.scss";

const SignUp: FC = () => {
  const { loading, data, error } = useSelector((state: IState) => state.signUp);
  const dispatch = useDispatch();
  const history = useHistory();

  const signUpClassName = classNames(
    styles.signup,
    { error: error }
  );

  useEffect(() => {
    if (data === "created") {
      history.push("/login");
    }

    return () => {
      dispatch(clearData());
    }
  }, [data]);

  const formik = useFormik<ISignUpForm>({
    initialValues: {
      fname: '',
      lname: '',
      email: '',
      password: '',
    },
    validateOnBlur: true,
    validateOnChange: false,
    validateOnMount: false,
    validationSchema: signUpSchema,
    onSubmit: values => {
      dispatch(fetchSignUp(values));
    },
  });

  const { fname, lname, email, password } = formik.errors;

  return (
    <div className={signUpClassName}>
      {loading && <Loading />}
      <Form onSubmit={formik.handleSubmit}>
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
        <Form.Group>
          <Form.Button primary type="submit">Submit</Form.Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default SignUp;
