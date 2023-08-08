import { Schema, model } from 'mongoose';
import { IPost } from './post.interfaces';

const PostSchema = new Schema<IPost>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    videos: [
      {
        type: String,
      },
    ],
    audios: [
      {
        type: String,
      },
    ],
    caption: {
      type: String,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: [],
      },
    ],
    comments: {
      type: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
          },
          text: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

PostSchema.pre('save', function (next) {
  const { images, videos, audios, caption } = this;
  if (
    (!images || images.length === 0) &&
    (!videos || videos.length === 0) &&
    (!audios || audios.length === 0) &&
    !caption
  ) {
    throw new Error(
      'Either the images, videos, audios, or caption field must be provided.'
    );
  }
  next();
});

export const Post = model<IPost>('post', PostSchema);
