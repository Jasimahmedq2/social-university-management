// models/message.ts

import { Schema, model } from 'mongoose';
import { IMessage } from './message.interface';

const messageSchema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    content: { type: String, required: true },
    chat: {
      type: Schema.Types.ObjectId,
      ref: 'chat',
    },
  },
  { timestamps: true }
);

export const Message = model<IMessage>('message', messageSchema);
