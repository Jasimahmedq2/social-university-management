import { z } from 'zod';

const createPostZodSchema = z.object({
  body: z.object({
    image: z.string().optional(),
    caption: z.string().optional(),
  }),
});
const createCommentZodSchema = z.object({
  body: z.object({
    text: z.string(),
  }),
});

export const PostValidation = {
  createPostZodSchema,
  createCommentZodSchema,
};
