import { Types } from 'mongoose';
import ApiError from '../../../errors/apiErrors';
import { IPost } from '../post/post.interfaces';
import { Post } from '../post/post.model';
import { IUser } from './user.interfaces';
import { User } from './user.model';
import { Chat } from '../chats/chat.model';

// const createUser = async (userInfo: IUser) => {
//   userInfo.password = await bcrypt.hash(
//     userInfo.password,
//     Number(config.bcrypt_hash_sold)
//   );
//   userInfo.role = 'user';
//   const result = await User.create(userInfo);
//   return result;
// };

const getAllUser = async (userId: Types.ObjectId): Promise<IUser[]> => {
  const result = await User.find({ _id: { $ne: userId } }).sort({
    updatedAt: -1,
  });
  return result;
};

const ChatsUsers = async (userId: Types.ObjectId): Promise<IUser[]> => {
  const chats = await Chat.find({ participants: userId }).sort({
    last_update: -1,
  });

  const usersMap: Map<string, IUser> = new Map();

  for (const chat of chats) {
    const participantIds = chat.participants.filter(
      id => id.toString() !== userId.toString()
    );
    const users = await User.find({ _id: { $in: participantIds } }).sort({
      updatedAt: -1,
    });

    users.forEach(user => {
      usersMap.set(user._id.toString(), user);
    });
  }

  const sortedUsers = Array.from(usersMap.values()).sort((a, b) => {
    const aLastUpdate: any = chats.find(chat =>
      chat.participants.includes(a._id)
    )?.last_update;

    const bLastUpdate: any = chats.find(chat =>
      chat.participants.includes(b._id)
    )?.last_update;

    return bLastUpdate - aLastUpdate;
  });

  return sortedUsers;
};

const getFriends = async (userId: string) => {
  const followers = await User.findOne(
    { _id: userId },
    { followers: 1, _id: 0 }
  )
    .lean()
    .populate('followers');

  const following = await User.findOne(
    { _id: userId },
    { following: 1, _id: 0 }
  )
    .lean()
    .populate('following');
  const followersArray = followers?.followers || [];
  const followingArray = following?.following || [];

  const result = [...followersArray, ...followingArray];
  return result;
};

const getSuggestedFriends = async (
  userId: string
): Promise<IUser[] | IUser | null> => {
  const currentUser = await User.findById(userId);
  const currentFriends = currentUser?.followers ?? [];
  const currentFollowing = currentUser?.following ?? [];

  let result;

  if (currentFriends) {
    result = await User.find(
      {
        _id: { $nin: [...currentFriends, ...currentFollowing, userId] },
      },
      { name: 1, profilePic: 1 }
    );
  } else {
    result = await User.find(
      {
        _id: { $ne: userId },
      },
      { name: 1, profilePic: 1 }
    );
  }
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

  if (followerUser?.followers?.includes(user?._id)) {
    throw new ApiError(404, 'User is already being followed');
  }

  followerUser?.followers?.push(user._id);
  user?.following?.push(followerUser._id);

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

  if (!followerUser?.followers?.includes(user._id)) {
    throw new ApiError(404, 'User is not being followed');
  }

  followerUser.followers = followerUser.followers.filter(
    followedUserId => followedUserId.toString() !== userId
  );

  user.following = user?.following?.filter(
    followingUserId => followingUserId.toString() !== followerId
  );

  await user.save();
  await followerUser.save();

  return {
    result: 'successfully  unFollowed the user',
  };
};

export const userServices = {
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
  ChatsUsers,
};
