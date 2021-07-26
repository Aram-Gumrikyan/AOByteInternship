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