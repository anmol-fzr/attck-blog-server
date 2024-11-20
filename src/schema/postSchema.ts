import { z } from "zod";

const newPostSchema = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
  }),
});

export { newPostSchema };
