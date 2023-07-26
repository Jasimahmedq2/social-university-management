import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewar/validateRequest';
import { AuthValidation } from './auth.validation';
const router = express.Router();

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

export const authRoutes = router;
