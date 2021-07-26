import { Schema, model } from "mongoose";
import { IUser } from "../interfaces";

const UserSchema = new Schema<IUser>({
  fname: {
    type: String,
    trim: true,
    required: true,
  },
  lname: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  ip: {
    type: Array,
    require: true,
  }
});

const User = model<IUser>("users", UserSchema);
export default User;