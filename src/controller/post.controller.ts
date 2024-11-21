import { query, Request, Response } from "express";
import { newPostSchema } from "@/schema";
import { z } from "zod";
import { Post } from "@/model";
import { Aggregate } from "mongoose";

type PostBody = z.infer<typeof newPostSchema>["body"];

// handles multiple with authorId filter
const getAllPosts = async (req: Request, res: Response) => {
  const authorId = req.query.authorId;
  const _id = req.query._id;

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

  if (_id) {
    aggr.match({
      $expr: {
        $regexMatch: {
          input: { $toString: "$_id" },
          regex: _id,
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

  return res.json({ data: _id ? posts[0] : posts });
};

const createPost = async (req: Request, res: Response) => {
  const { title, desc, content }: PostBody = req.body;
  const { userId } = req.user;

  const newPost = new Post({ title, desc, content, authorId: userId });
  const savedPost = await newPost.save();

  return res.json({ data: savedPost, message: "Post Published Successfully" });
};

export { createPost, getAllPosts };
