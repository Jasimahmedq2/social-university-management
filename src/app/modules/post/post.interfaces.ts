import { Types } from 'mongoose';

export type IPost = {
  user: Types.ObjectId;
  image: string;
  caption: string;
  likes: Types.ObjectId[];
  comments: {
    user: Types.ObjectId;
    text: string;
  }[];
};
