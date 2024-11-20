import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { envs } from "@/utils";
import type { GetTokenPayload } from "@/helper";

declare global {
  namespace Express {
    interface Request {
      user: GetTokenPayload;
    }
  }
}

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Authentication credentials are required.");
  }

  jwt.verify(
    token,
    envs.JWT_SECRET_KEY,
    (err: Error, user: GetTokenPayload) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    },
  );
};

export { authenticate };
