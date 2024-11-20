import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import { startup } from "@/helper";
import { createPost, getAllPosts, loginHndlr, signupHndlr } from "./controller";

startup();

const logger = pino({ name: "server start" });
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));
app.use(helmet());

app.post("/login", loginHndlr).post("/signup", signupHndlr);
app.get("/posts", getAllPosts).post("/post", createPost);

export { app, logger };
