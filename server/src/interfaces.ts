import express from "express"

export interface IController {
  path: string;
  router: express.Router;
}

export interface IUser extends ISignUpForm {
  ip: string[];
}

export interface ISignUpForm {
  fname: string;
  lname: string;
  role: "employer" | "employee" | "";
  phoneNumber: string;
  email: string;
  password: string;
}