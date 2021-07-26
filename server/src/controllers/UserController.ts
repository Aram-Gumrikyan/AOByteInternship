import express, { Request, Response } from "express";
import User from "../models/user";
import Middleware from "../middlewear";
import { IController } from "../interfaces";

class UserController implements IController {
  public path = '/user';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(this.path, Middleware.auth, this.getUserData);
  }

  getUserData = async (req: Request, res: Response) => {
    const id: string = res.locals.data.id;

    const user = await User.findOne({ _id: id }).select('-_id fname lname email');

    res.json(user);
  }
}

export default UserController;