import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { startup } from "@/helper";
import { createPost, getAllPosts } from "./controller";
import { envs } from "./utils";
import { authRouter } from "@/router";
import { validate } from "./middleware";
import { newPostSchema } from "./schema";

startup();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));
app.use(helmet());

app.get("/health", (_req, res) => {
  return res.json({ message: "Hello World" });
});

app.use("/auth", authRouter);

app
  .get("/posts", getAllPosts)
  .post("/post", validate(newPostSchema), createPost);

const { PORT } = envs;

app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`);
});
