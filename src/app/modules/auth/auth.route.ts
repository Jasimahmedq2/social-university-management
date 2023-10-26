import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewar/validateRequest';
import { AuthValidation } from './auth.validation';
import { userZodValidation } from '../Users/user.validation';
const router = express.Router();

router.post(
  '/create-user',
  validateRequest(userZodValidation.createUserZodSchema),
  AuthControllers.createUser
);
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationZodSchema),
  AuthControllers.loginUser
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthControllers.refreshToken
);
router.post('/reset-password-request', AuthControllers.resetPasswordRequest);
router.post('/reset-password', AuthControllers.resetPassword);
router.post('/verify/:token', AuthControllers.verifyEmailAndUpdateStatus);

export const authRoutes = router;
