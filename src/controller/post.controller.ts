import { Request, Response } from "express";
import { newPostSchema } from "@/schema";
import { z } from "zod";
import { Post } from "@/model";
import { Aggregate } from "mongoose";

type PostBody = z.infer<typeof newPostSchema>["body"];

// handles multiple with authorId filter
const getAllPosts = async (req: Request, res: Response) => {
  const authorId = req.query.authorId;

  const aggr = new Aggregate();

  if (authorId) {
    aggr.match({
      $expr: {
        $regexMatch: {
          input: { $toString: "$authorId" },
          regex: authorId,
          options: "i",
        },
      },
    });
  }

  aggr.sort({
    createdAt: -1,
  });

  const pipeline = aggr.pipeline();

  const posts = await Post.aggregate(pipeline);

  return res.json({ data: posts });
};

const createPost = async (req: Request, res: Response) => {
  const { title, content }: PostBody = req.body;
  const { userId } = req.user;

  const newPost = new Post({ title, content, authorId: userId });
  const savedPost = await newPost.save();

  return res.json({ data: savedPost });
};

export { createPost, getAllPosts };
