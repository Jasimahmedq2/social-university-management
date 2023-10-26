import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../../config';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.createUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully created a user',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginInfo } = req.body;
  console.log({ loginInfo });
  const result = await AuthServices.loginUser(loginInfo);
  const { accessToken, refreshToken, user } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully login a user',
    data: { accessToken, user },
  });
});

const verifyEmailAndUpdateStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { token } = req.params;
    // const token = (req as any).headers.authorization.split(" ")[1];
    console.log({ token });
    const result = await AuthServices.verifyEmailAndUpdateStatus(token);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'the user is verified!',
      data: result,
    });
  }
);

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthServices.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully generate new accessToken',
    data: result,
  });
});

const resetPasswordRequest = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log({ email: email });
  const result = await AuthServices.resetPasswordRequest(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully send a request',
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { ...resetInfo } = req.body;
  const result = await AuthServices.resetPassword(resetInfo);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully reset password',
    data: result,
  });
});
export const AuthControllers = {
  createUser,
  loginUser,
  refreshToken,
  resetPasswordRequest,
  resetPassword,
  verifyEmailAndUpdateStatus,
};
