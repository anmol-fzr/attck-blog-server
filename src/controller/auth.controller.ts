import { Request, Response } from "express";

const loginHndlr = (req: Request, res: Response) => {
  return res.json({ data: null });
};

const signupHndlr = (req: Request, res: Response) => {
  return res.json({ data: null });
};

export { loginHndlr, signupHndlr };
