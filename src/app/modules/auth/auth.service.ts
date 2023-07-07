import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/apiErrors';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../Users/user.model';
import { ILoginInfo, ILoginResponse } from './auth.interfaces';
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
    },
    config.jwt.access_secret as Secret,
    config.jwt.access_expire as string
  );

  const refreshToken = await jwtHelpers.createToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expire as string
  );

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const AuthServices = {
  loginUser,
};
