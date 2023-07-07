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

export const authRoutes = router;
