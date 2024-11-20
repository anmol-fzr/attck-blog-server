import { Model, model, Schema } from "mongoose";

type IUser = {
  email: string;
  passwordHash: string;
};

const userSchema = new Schema<IUser, Model<IUser>>(
  {
    email: {
      type: Schema.Types.String,
      required: true,
      index: true,
      unique: true,
    },
    passwordHash: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = model<IUser>("users", userSchema);

export { User };
