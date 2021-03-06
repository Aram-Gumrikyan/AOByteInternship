import express, { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import User from "../models/user"
import { IController, ISignUpForm } from "../interfaces"

class SignUpController implements IController {
  public path = '/signup';
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

      if (!this.validation(data)) {
        throw new Error("data is wrong");
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;

      const newUser = new User(data);
      newUser.ip = [req.ip];
      await newUser.save();

      res.sendStatus(201);
    } catch (e) {
      res.sendStatus(400);
    }
  }

  private validation(data: ISignUpForm): boolean {
    const { fname, lname, email, password } = data;
    //Minimum eight characters, at least one letter, one number and one special character
    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (
      fname &&
      lname &&
      validator.isEmail(email) &&
      password.match(passwordRegEx)
    ) {
      return false;
    }

    return true;
  }
}

export default SignUpController;