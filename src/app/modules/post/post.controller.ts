import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { PostServices } from './post.service';
import sendResponse from '../../../shared/sendResponse';

const createPost = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const userId = user?.userId;
  const { ...postInfo } = req.body;
  const result = await PostServices.cratePost(userId, postInfo);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully created a post',
    data: result,
  });
});

const createCommentToPost = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const userId = user?.userId;
  const { postId } = req.params;
  const { text } = req.body;
  const result = await PostServices.createCommentToPost(postId, userId, text);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully created a comment',
    data: result,
  });
});
const postLikeDislike = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const userId = user?.userId;
  const { postId } = req.params;
  const result = await PostServices.postLikeDislike(postId, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'success',
    data: result,
  });
});

export const PostControllers = {
  createPost,
  createCommentToPost,
  postLikeDislike
};
