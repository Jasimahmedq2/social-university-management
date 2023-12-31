import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'firstName is required',
      }),
      lastName: z.string({
        required_error: 'lastName  is required',
      }),
    }),
    email: z
      .string({
        required_error: 'email is required',
      })
      .email(),
    password: z.string({
      required_error: 'password is required',
    }),
    profilePic: z.string().optional(),
  }),
});

const updateUserZodSchema = z.object({
  body: z
    .object({
      name: z
        .object({
          firstName: z
            .string({
              required_error: 'firstName is required',
            })
            .optional(),
          lastName: z
            .string({
              required_error: 'lastName is required',
            })
            .optional(),
        })
        .optional(),
      email: z
        .string({
          required_error: 'email is required',
        })
        .email()
        .optional(),
      password: z
        .string({
          required_error: 'password is required',
        })
        .optional(),
      profilePic: z.string().optional(),
    })
    .optional(),
});

export const userZodValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
