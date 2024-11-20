import { z } from "zod";

const loginSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Enter a valid Email address" }),
    password: z.string().min(5, "Password must be of atleast 5 characters"),
  }),
});

const signUpSchema = loginSchema;

export { loginSchema, signUpSchema };
