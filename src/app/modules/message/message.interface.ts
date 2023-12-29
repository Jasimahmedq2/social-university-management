import { Types } from 'mongoose';

export type IMessage = {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  content: string;
  chat: Types.ObjectId;
  createdAt: Date;
};
export type ICreateMessage = {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  content: string;
};
