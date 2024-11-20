import { Model, model, ObjectId, Schema } from "mongoose";

type IPost = {
  title: string;
  content: string;
  authorId: ObjectId;
};

const postSchema = new Schema<IPost, Model<IPost>>(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    content: {
      type: Schema.Types.String,
      required: true,
    },
    authorId: {
      type: Schema.Types.String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Post = model<IPost>("posts", postSchema);

export { Post };
