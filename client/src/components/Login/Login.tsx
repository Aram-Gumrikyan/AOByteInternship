import { FC, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import { Form } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Cookies from 'universal-cookie';
import classNames from "classnames";

import { ILoginForm, IState } from "../../interfaces";
import { loginSchema } from "../../validation";
import { fetchLogin } from "../../features/user/api";
import Loading from "../Loading";
import styles from "./Login.module.scss";

const Login: FC = () => {
  const { loading, token, error } = useSelector((state: IState) => state.user.login);
  const dispatch = useDispatch();
  const history = useHistory();
  const cookies = useMemo(() => {
    return new Cookies();
  }, []);

  const loginClassName = classNames(
    styles.login,
    { error: error }
  );

  useEffect(() => {
    if (token) {
      cookies.set("token", token);
      history.push("/userpage");
    }
  }, [token, history, cookies]);

  const formik = useFormik<ILoginForm>({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnBlur: true,
    validateOnChange: false,
    validateOnMount: false,
    validationSchema: loginSchema,
    onSubmit: values => {
      dispatch(fetchLogin(values));
    },
  });

  const { email, password } = formik.errors;

  return (
    <div className={loginClassName}>
      {loading && <Loading />}
      <Form onSubmit={formik.handleSubmit}>
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
          />
        </Form.Group>
        <Form.Group>
          <Form.Button primary type="submit">Submit</Form.Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Login;
