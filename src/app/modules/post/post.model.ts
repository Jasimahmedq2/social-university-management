import { Schema, model } from 'mongoose';
import { IPost } from './post.interfaces';

const PostSchema = new Schema<IPost>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    image: {
      type: String,
    },
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
  const { image, caption } = this;
  if (!image && !caption) {
    throw new Error('Either the image or caption field must be provided.');
  }
  next();
});

export const Post = model<IPost>('post', PostSchema);
