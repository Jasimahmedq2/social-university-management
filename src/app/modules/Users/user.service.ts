import ApiError from '../../../errors/apiErrors';
import { IPost } from '../post/post.interfaces';
import { Post } from '../post/post.model';
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
const getFriends = async (userId: string): Promise<IUser[] | IUser | null> => {
  const result = await User.findOne(
    { _id: userId },
    { followers: 1, _id: 0 }
  ).populate('followers');
  console.log({ result });

  return result;
};
const getSuggestedFriends = async (
  userId: string
): Promise<IUser[] | IUser | null> => {
  const currentUser = await User.findById(userId);
  const currentFriends = currentUser?.followers;

  const result = await User.find(
    {
      _id: { $nin: [...currentFriends, userId] },
    },
    { name: 1, profilePic: 1,}
  );
  console.log({ result });

  return result;
};

const userFeedPost = async (userId: string): Promise<IPost[]> => {
  const user = await User.findById(userId);
  const followers = user?.followers;

  const posts = await Post.find({
    $or: [{ user: userId }, { user: { $in: followers } }],
  })
    .populate('user')
    .sort('-createdAt');
  console.log({ posts });
  return posts;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};
const getSingleUserWithId = async (id: string): Promise<IUser | null> => {
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

const userFollowing = async (userId: string, followerId: string) => {
  const user = await User.findById(userId);
  const followerUser = await User.findById(followerId);
  console.log({
    user,
    followerUser,
  });

  if (!user) {
    throw new ApiError(404, "user doesn't exist");
  }

  if (!followerUser) {
    throw new ApiError(404, "follower user doesn't exist");
  }

  if (user?.followers?.includes(followerUser._id)) {
    throw new ApiError(404, 'User is already being followed');
  }

  user?.followers?.push(followerUser._id);
  followerUser?.following?.push(user._id);

  await user.save();
  await followerUser.save();

  return {
    result: 'successfully followed the user',
  };
};

const unFollowingUser = async (userId: string, followerId: string) => {
  const user = await User.findById(userId);
  const followerUser = await User.findById(followerId);
  console.log({
    user,
    followerUser,
  });

  if (!user) {
    throw new ApiError(404, "user doesn't exist");
  }

  if (!followerUser) {
    throw new ApiError(404, "follower user doesn't exist");
  }

  if (!user?.followers?.includes(followerUser._id)) {
    throw new ApiError(404, 'User is not being followed');
  }

  user.followers = user.followers.filter(
    followedUserId => followedUserId.toString() !== followerId
  );

  followerUser.following = followerUser?.following?.filter(
    followingUserId => followingUserId.toString() !== userId
  );

  await user.save();
  await followerUser.save();

  return {
    result: 'successfully  unFollowed the user',
  };
};

export const userServices = {
  createUser,
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
