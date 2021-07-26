import SignUpController from "./SignUpController";
import LoginController from "./LoginController";
import UserController from "./UserController";
import { IController } from "../interfaces";

const controllers: IController[] = [
  new SignUpController,
  new LoginController,
  new UserController,
]

export default controllers;