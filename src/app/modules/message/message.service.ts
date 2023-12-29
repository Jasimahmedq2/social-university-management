import { Chat } from '../chats/chat.model';
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
  const { sender, receiver } = payload;
  console.log({ payload });
  const newMessage = new Message(payload);
  await newMessage.save();
  const chat = await Chat.findOne({
    participants: {
      $all: [sender, receiver],
    },
  });

  if (!chat) {
    const newChat = new Chat({
      participants: [sender, receiver],
      last_update: new Date(),
    });
    await newChat.save();
    newMessage.chat = newChat._id;

    await newMessage.save();
  } else {
    chat.last_update = new Date();
    await chat.save();

    newMessage.chat = chat._id;
    await newMessage.save();
  }
};

export const MessageServices = {
  getMessages,
  createMessage,
};
