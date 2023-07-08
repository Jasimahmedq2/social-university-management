import { IUser } from './user.interfaces';
import { User } from './user.model';

const createUser = async (userInfo: IUser) => {
  userInfo.role = 'user';
  const result = await User.create(userInfo);
  return result;
};

const getAllUser = async (): Promise<IUser[]> => {
  const result = await User.find({});
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

const updateUser = async (id: string, payload: Partial<IUser>) => {
  const result = await User.updateOne({ _id: id }, payload, { new: true });
  return result;
};

export const userServices = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
};
