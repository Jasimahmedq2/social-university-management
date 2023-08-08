import { z } from 'zod';

const createPostZodSchema = z.object({
  body: z.object({
    images: z.array(z.string()).optional(),
    videos: z.array(z.string()).optional(),
    audios: z.array(z.string()).optional(),
    caption: z.string().optional(),
  }),
});
const createCommentZodSchema = z.object({
  body: z.object({
    text: z.string({
      required_error: 'text is required',
    }),
  }),
});

export const PostValidation = {
  createPostZodSchema,
  createCommentZodSchema,
};
