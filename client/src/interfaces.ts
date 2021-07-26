export interface ISignUpState {
  loading: boolean;
  data: string;
  error: boolean;
}

export interface ISignUpForm {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

export interface IState {
  signUp: ISignUpState;
}