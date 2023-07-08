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
router.get('/get-users', userControllers.getAllUser);
router.get('/get-user/:id', userControllers.getSingleUser);
router.delete('/delete-user/:id', userControllers.deleteUser);
router.patch(
  '/update-user/:id',
  validateRequest(userZodValidation.updateUserZodSchema),
  userControllers.updateUser
);

export const userRoutes = router;
