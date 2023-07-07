import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { userServices } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userInfo } = req.body;
  const result = await userServices.createUser(userInfo);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully created an user',
    data: result,
  });
});

export const userControllers = {
  createUser,
};
