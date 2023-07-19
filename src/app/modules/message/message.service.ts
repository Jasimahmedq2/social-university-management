import { ICreateMessage } from './message.interface';
import { Message } from './message.model';

const getMessages = async (senderId: string, receiverId: string) => {
  const messages = await Message.find({
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId },
    ],
  })
    .sort({ createdAt: 1 })
    .populate('sender')
    .populate('receiver');
  return messages;
};

const createMessage = async (payload: ICreateMessage) => {
  const result = await Message.create(payload);
  return result;
};
export const MessageServices = {
  getMessages,
  createMessage,
};
