import express, { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import User from "../models/user";
import Middleware from "../middlewear";
import { IController, ISignUpForm } from "../interfaces";

class UserController implements IController {
  public path = '/user';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(this.path, this.createUser);
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const data: ISignUpForm = req.body.data;

      if (!this.signUpValidation(data)) {
        throw new Error("400");
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;

      const newUser = new User(data);
      await newUser.save();

      res.sendStatus(201);
    } catch (e) {
      res.status(e.message).send(e.message);
    }
  }

  private signUpValidation(data: ISignUpForm): boolean {
    const { fname, lname, role, phoneNumber, email, password } = data;
    //Minimum eight characters, at least one letter, one number and one special character
    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const roleRegEx = /employer|employee/;
    const phonNumberRegEx = /[+]374[0-9]{8}/;

    if (
      !fname ||
      !lname ||
      !roleRegEx.test(role) ||
      !phonNumberRegEx.test(phoneNumber) ||
      !validator.isEmail(email) ||
      !passwordRegEx.test(password)
    ) {
      return false;
    }

    return true;
  }

  // getUserData = async (req: Request, res: Response) => {
  //   const id: string = res.locals.data.id;

  //   const user = await User.findOne({ _id: id }).select('-_id fname lname email');

  //   res.json(user);
  // }
}

export default UserController;