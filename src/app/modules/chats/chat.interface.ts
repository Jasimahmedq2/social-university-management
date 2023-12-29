import { Types } from 'mongoose';

export type IChat = {
  participants: Types.ObjectId[];
  last_update: Date;
};
