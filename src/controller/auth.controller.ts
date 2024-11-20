import { User } from "@/model";
import { loginSchema } from "@/schema";
import { Request, Response } from "express";
import { z } from "zod";
import * as jwt from "jsonwebtoken";
import { jwtHelper, passHelper } from "@/helper";
import { envs } from "@/utils";

type LoginBody = z.infer<typeof loginSchema>["body"];

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

  const token = jwtHelper.getToken({
    userId: foundUser._id.toString(),
    email,
  });

  return res.json({
    data: {
      token,
      email,
    },
    message: "Loggedin Successfully",
  });
};

const signupHndlr = (req: Request, res: Response) => {
  return res.json({ data: null });
};

export { loginHndlr, signupHndlr };
