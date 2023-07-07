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
    // role: z.enum([...UserRoleConstant] as [string, ...string[]], {
    //   required_error: 'role  is required',
    // }),
    profilePic: z.string().optional(),
  }),
});

export const userZodValidation = {
  createUserZodSchema,
};
