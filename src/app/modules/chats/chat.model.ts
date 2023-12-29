import { Schema, model } from 'mongoose';
import { IChat } from './chat.interface';

const ChatSchema = new Schema<IChat>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    last_update: Date,
  },
  {
    timestamps: true,
  }
);

export const Chat = model<IChat>('chat', ChatSchema);
