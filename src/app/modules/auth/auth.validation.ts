import { z } from 'zod';
const loginValidationZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'refresh token is required',
    }),
  }),
});

export const AuthValidation = {
  loginValidationZodSchema,
  refreshTokenZodSchema,
};
