import { Types } from 'mongoose';

export type IPost = {
  user: Types.ObjectId;
  images?: string[];
  videos?: string[];
  audios?: string[];
  caption: string;
  likes: Types.ObjectId[];
  comments: {
    user: Types.ObjectId;
    text: string;
  }[];
};
