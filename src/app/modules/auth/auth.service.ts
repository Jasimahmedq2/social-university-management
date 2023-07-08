import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/apiErrors';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../Users/user.model';
import {
  ILoginInfo,
  ILoginResponse,
  IRefreshResponse,
} from './auth.interfaces';
import bcrypt from 'bcrypt';

const loginUser = async (loginInfo: ILoginInfo): Promise<ILoginResponse> => {
  const { email, password } = loginInfo;
  const isUserExist = await User.findOne({ email: email });
  if (!isUserExist) {
    throw new ApiError(404, "user doesn't exist");
  }
  const comparePass = await bcrypt.compare(password, isUserExist.password);
  if (!comparePass) {
    throw new ApiError(500, "password doesn't matched");
  }

  const accessToken = await jwtHelpers.createToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
      userId: isUserExist._id,
    },
    config.jwt.access_secret as Secret,
    config.jwt.access_expire as string
  );

  const refreshToken = await jwtHelpers.createToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
      userId: isUserExist._id,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expire as string
  );

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

const refreshToken = async (
  refreshToken: string
): Promise<IRefreshResponse> => {
  let verifiedUser = null;
  try {
    verifiedUser = jwtHelpers.verifyToken(
      refreshToken,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(401, 'unValidated');
  }

  const { userId } = verifiedUser;
  const userExist = await User.findOne({ _id: userId });
  if (!userExist) {
    throw new ApiError(404, "user doesn't exist");
  }

  const newAccessToken = await jwtHelpers.createToken(
    { email: userExist.email, userId: userExist._id, role: userExist.role },
    config.jwt.access_secret as string,
    config.jwt.access_expire as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
