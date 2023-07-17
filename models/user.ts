import { Schema, model, models } from "mongoose";

export interface IUser extends Document {
  email: string;
  username: string;
  image: string;
}

interface IUserSchema {
  email: {
    type: string;
    unique: Array<boolean | string>;
    required: Array<boolean | string>;
  };
  username: {
    type: string;
    required: Array<boolean | string>;
    match: Array<string>;
  };
  image: {
    type: string;
  };
}

const UserSchema: Schema = new Schema<IUserSchema>({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,25}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
