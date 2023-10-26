import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { userServices } from './user.service';

// const createUser = catchAsync(async (req: Request, res: Response) => {
//   const { ...userInfo } = req.body;
//   const result = await userServices.createUser(userInfo);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'successfully created an user',
//     data: result,
//   });
// });

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const user = req?.user;
  const userId = user?.userId;
  const result = await userServices.getAllUser(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully get all user',
    data: result,
  });
});
const getFriends = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const result = await userServices.getFriends(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully get all friends',
    data: result,
  });
});
const getSuggestedFriends = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const result = await userServices.getSuggestedFriends(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully get all suggested friends',
    data: result,
  });
});
const userFeedPost = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const result = await userServices.userFeedPost(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully get all feed post',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req?.user?.userId;
  const result = await userServices.getSingleUser(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully get a user',
    data: result,
  });
});

const getSingleUserWithId = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await userServices.getSingleUserWithId(userId);
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

const userFollowing = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const { followerId } = req.params;

  console.log({
    userId,
    followerId,
  });

  const result = await userServices.userFollowing(userId, followerId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully followed the user',
    data: result,
  });
});
const unFollowingUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const { followerId } = req.params;

  console.log({
    userId,
    followerId,
  });

  const result = await userServices.unFollowingUser(userId, followerId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully unFollowed the user',
    data: result,
  });
});

export const userControllers = {
  getAllUser,
  getSingleUser,
  getSingleUserWithId,
  deleteUser,
  updateUser,
  userFollowing,
  unFollowingUser,
  getFriends,
  getSuggestedFriends,
  userFeedPost,
};
