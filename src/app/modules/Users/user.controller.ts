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

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getAllUser();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully get all user',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userServices.getSingleUser(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully get a user',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userServices.deleteUser(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully deleted a user',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updatedInfo } = req.body;
  const result = await userServices.updateUser(id, updatedInfo);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully updated the user',
    data: result,
  });
});

export const userControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
};
