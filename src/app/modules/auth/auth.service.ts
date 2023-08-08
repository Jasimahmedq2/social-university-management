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
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

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
    user: {
      userId: isUserExist?._id.toString(),
      email: isUserExist?.email,
      name: isUserExist?.name,
    },
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

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.my_email,
    pass: config.my_password,
  },
});

const resetPasswordRequest = async (email: string) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new ApiError(404, "user doesn't exist");
  }

  const resetToken = uuidv4();
  const resetTokenExpiration = new Date();
  resetTokenExpiration.setHours(resetTokenExpiration.getHours() + 1);

  // Save reset token and expiration time to the user
  user.resetToken = resetToken;
  user.resetTokenExpiration = resetTokenExpiration;
  await user.save();

  const resetUrl = `https://book-catalog-frontend.netlify.app/set-password/${resetToken}`;
  const mailOptions = {
    from: 'jasim.dev48@gmail.com',
    to: email,
    subject: 'Reset Password',
    html: `<p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
    <p>Please click on the following link to reset your password:</p>
    <a href="${resetUrl}">Reset Password</a>
    <p>If you did not request this, please ignore this email, and your password will remain unchanged.</p>`,
  };

  // Send the email
  const result = await transporter.sendMail(mailOptions);
  return result;
};

const resetPassword = async (payload: {
  resetToken: string;
  password: string;
}) => {
  const { resetToken, password } = payload;
  console.log({ payload });
  try {
    const user = await User.findOne({
      resetToken: resetToken,
      resetTokenExpiration: { $gt: new Date() },
    });
    console.log({ user });

    if (!user) {
      throw new ApiError(404, 'Invalid or expired reset token');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_hash_sold)
    );

    console.log({ hashedPassword });

    // Update the user's password and reset token fields
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    const result = await user.save();
    return result;
  } catch (error) {
    console.log({ error });
  }
};

export const AuthServices = {
  loginUser,
  refreshToken,
  resetPasswordRequest,
  resetPassword,
};
