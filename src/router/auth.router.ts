import { loginHndlr, signupHndlr } from "@/controller";
import { validate } from "@/middleware";
import { loginSchema, signUpSchema } from "@/schema";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", validate(loginSchema), loginHndlr);
authRouter.post("/signup", validate(signUpSchema), signupHndlr);

export { authRouter };
