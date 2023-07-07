import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewar/validateRequest';
import { userZodValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(userZodValidation.createUserZodSchema),
  userControllers.createUser
);

export const userRoutes = router;
