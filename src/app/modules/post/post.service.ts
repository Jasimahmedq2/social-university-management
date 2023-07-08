import { Types } from 'mongoose';
import { IPost } from './post.interfaces';
import { Post } from './post.model';
import ApiError from '../../../errors/apiErrors';

const cratePost = async (id: Types.ObjectId, payload: IPost) => {
  payload.user = id;
  const result = await Post.create(payload);
  return result;
};
const createCommentToPost = async (
  postId: string,
  userId: Types.ObjectId,
  text: string
): Promise<IPost> => {
  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw new ApiError(404, "post doesn't exist");
  }
  console.log({
    post: post,
    userId: userId,
    postId: postId,
    text: text,
  });

  const newComment = {
    user: userId,
    text: text,
  };

  post.comments.push(newComment);

  const result = await post.save();

  return result;
};

const postLikeDislike = async (
  postId: string,
  userId: Types.ObjectId
): Promise<IPost> => {
  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw new ApiError(404, "post doesn't exist");
  }
  console.log({
    post: post,
    userId: userId,
    postId: postId,
  });

  const userIndex = post.likes.indexOf(userId);

  if (userIndex === -1) {
    post.likes.push(userId);
  } else {
    post.likes.splice(userIndex, 1);
  }

  const result = await post.save();

  return result;
};

export const PostServices = {
  cratePost,
  createCommentToPost,
  postLikeDislike,
};
