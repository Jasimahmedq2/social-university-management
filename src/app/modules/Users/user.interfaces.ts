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
  followers?: Types.ObjectId[];
  following?: Types.ObjectId[];
};
