import { IUser } from './user.interfaces';
import { User } from './user.model';

const createUser = async (userInfo: IUser) => {
  userInfo.role = 'user';
  const result = await User.create(userInfo);
  return result;
};

export const userServices = {
  createUser,
};
