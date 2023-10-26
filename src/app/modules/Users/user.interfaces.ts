import { Types } from 'mongoose';

export type UserRole = 'admin' | 'user';

export type IUser = {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  role: UserRole;
  profilePic?: string;
  bio?: string;
  isVerified: boolean;
  followers?: Types.ObjectId[];
  following?: Types.ObjectId[];
  resetToken?: string | null;
  resetTokenExpiration?: Date | null;
};
