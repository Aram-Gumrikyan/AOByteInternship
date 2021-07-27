export enum Role {
  EMPLOYER = "employer",
  EMPLOYEE = "employee",
}

export interface IState {
  user: IUserState;
}

interface IUserData {
  fname: string;
  lname: string;
  role: Role | "";
  phoneNumber: string;
  email: string;
}

export interface ISignUpForm extends IUserData {
  password: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IUserState {
  registered: boolean;
  data: IUserData | {};
  signUp: IUserSignUpState;
  login: IUserLoginState;
}

interface ILogError {
  loading?: boolean;
  error?: string;
}

interface IUserSignUpState extends ILogError {
  created?: boolean;
}

interface IUserLoginState extends ILogError {
  token?: string;
}

export interface IErrorMessage {
  [key: string]: string;
}