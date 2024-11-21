import { User } from "@/model";
import { loginSchema, signUpSchema } from "@/schema";
import { Request, Response } from "express";
import { z } from "zod";
import { jwtHelper, passHelper } from "@/helper";

type LoginBody = z.infer<typeof loginSchema>["body"];
type SignUpBody = z.infer<typeof signUpSchema>["body"];

const loginHndlr = async (req: Request, res: Response) => {
  const { email, password: rawPass }: LoginBody = req.body;

  const foundUser = await User.findOne({ email }).lean();

  if (foundUser === null) {
    return res.status(400).json({
      message: "User doesn't Exists",
    });
  }

  const isPassMatch = passHelper.compare(rawPass, foundUser.passwordHash);

  if (!isPassMatch) {
    return res.status(400).json({
      message: "Incorrect Passsword",
    });
  }

  const userId = foundUser._id.toString()

  const token = jwtHelper.getToken({
    userId,
    email,
  });

  return res.json({
    data: {
      userId,
      token,
      email,
    },
    message: "Loggedin Successfully",
  });
};

const signupHndlr = async (req: Request, res: Response) => {
  const { email, password: rawPass }: SignUpBody = req.body;

  const foundUser = await User.findOne({ email }).lean();

  if (foundUser !== null) {
    return res.status(400).json({
      message: "User with this Email already Exists",
    });
  }

  const passwordHash = await passHelper.hash(rawPass);

  const newUser = new User({ email, passwordHash });
  await newUser.save();

  return res.json({ message: "Signed up Successfully" });
};

export { loginHndlr, signupHndlr };
