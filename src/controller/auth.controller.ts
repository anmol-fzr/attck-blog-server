import { User } from "@/model";
import { loginSchema } from "@/schema";
import { Request, Response } from "express";
import { z } from "zod";
import bcryptjs from "bcryptjs";

type LoginBody = z.infer<typeof loginSchema>["body"];

const numSaltRounds = 8;

const loginHndlr = async (req: Request, res: Response) => {
  const { email, password: rawPassword }: LoginBody = req.body;

  const foundUser = await User.findOne({ email }).lean();

  if (foundUser === null) {
    return res.status(400).json({
      message: "User doesn't Exists",
    });
  }

  const password = await bcryptjs.hash(rawPassword, numSaltRounds);
  const isPassMatch = await bcryptjs.compare(password, foundUser.passwordHash);

  if (!isPassMatch) {
    return res.status(400).json({
      message: "Incorrect Passsword",
    });
  }

  return res.json({ data: null });
};

const signupHndlr = (req: Request, res: Response) => {
  return res.json({ data: null });
};

export { loginHndlr, signupHndlr };
