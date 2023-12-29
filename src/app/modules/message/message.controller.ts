import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { MessageServices } from './message.service';

const getMessages = catchAsync(async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.query;

  if (typeof senderId === 'string' && typeof receiverId === 'string') {
    const result = await MessageServices.getMessages(senderId, receiverId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'retrieve the whole message',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'senderId and receiverId must be provided as strings',
    });
  }
});

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const { ...messageInfo } = req.body;

  const result = await MessageServices.createMessage(messageInfo);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'created a message',
    data: result,
  });
});

export const MessageControllers = {
  getMessages,
  createMessage,
};
