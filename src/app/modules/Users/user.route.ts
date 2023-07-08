import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewar/validateRequest';
import { userZodValidation } from './user.validation';
import auth from '../../middlewar/auth';
import { UserRole } from '../../../enums/enums';

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
router.post(
  '/follow/:followerId',
  auth(UserRole.USER),
  userControllers.userFollowing
);
router.post(
  '/unFollow/:followerId',
  auth(UserRole.USER),
  userControllers.unFollowingUser
);

export const userRoutes = router;
