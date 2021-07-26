import { Document } from "mongoose";
import express from "express"

export interface IController {
  path: string;
  router: express.Router;
}

export interface ISignUpForm {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

<<<<<<< HEAD
export interface IUser extends ISignUpForm {
=======
export interface IUser extends ISignUpForm, Document {
>>>>>>> 3de72dd (add)
  ip: string[];
}