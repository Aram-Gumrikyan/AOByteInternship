export interface IState {
  signUp: ISignUpState;
  login: ILoginState;
  user: IUserState;
}

export interface ISignUpState extends IInitialState {
  data: string;
}

export interface ISignUpForm {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface ILoginState extends IInitialState {
  data: {
    token?: string;
  };
}

export interface IUser {
  fname: string;
  lname: string;
  email: string;
}

export interface IUserState extends IInitialState {
  data: IUser;
}

interface IInitialState {
  loading: boolean;
  error: boolean;
}