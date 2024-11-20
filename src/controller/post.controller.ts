import { Request, Response } from "express";

// handles multiple with authorId filter
const getAllPosts = (req: Request, res: Response) => {
  return res.json({ data: null });
};

const createPost = (req: Request, res: Response) => {
  return res.json({ data: null });
};

export { createPost, getAllPosts };
