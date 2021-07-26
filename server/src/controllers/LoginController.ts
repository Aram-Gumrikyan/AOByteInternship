import express, { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { IController, ISignUpForm } from "../interfaces"

class LoginController implements IController {
  public path = '/login';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(this.path, this.loginUser);
  }

  loginUser = async (req: Request, res: Response) => {
    try {
      const data: ISignUpForm = req.body.data;
      const { email, password } = data;

      if (!this.validation(data)) {
        throw new Error("data is wrong");
      }

      const user = await User.findOne({ email });

      const passCompare: boolean = await bcrypt.compare(password, user!.password);

      if (!passCompare) {
        throw new Error("password is wrong");
      }

      const hasIp = user!.ip.some((ip) => {
        if (ip === req.ip) true;

        return false;
      })

      if (!hasIp) {
        user!.ip.push(req.ip);
      }

      await user!.save();

      const secretKey: string = `${process.env.TOKEN_SECRET_KEY}`

      const token = jwt.sign(
        {
          id: user!.id,
        },
        secretKey,
        { expiresIn: '168h' }
      );

      res.json({ token });
    } catch (e) {
      res.sendStatus(400);
    }
  }

  private validation(data: ISignUpForm): boolean {
    const { email, password } = data;
    //Minimum eight characters, at least one letter, one number and one special character
    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (
<<<<<<< HEAD
      validator.isEmail(email) &&
      password.match(passwordRegEx)
=======
      !validator.isEmail(email) ||
      !password.match(passwordRegEx)
>>>>>>> 3de72dd (add)
    ) {
      return false;
    }

    return true;
  }
}

export default LoginController;