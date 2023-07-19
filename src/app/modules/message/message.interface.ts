import { Types } from 'mongoose';

export type IMessage = {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  content: string;
  createdAt: Date;
};
export type ICreateMessage = {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  content: string;
};
