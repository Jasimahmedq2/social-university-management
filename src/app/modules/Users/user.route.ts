import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewar/validateRequest';
import { userZodValidation } from './user.validation';
import auth from '../../middlewar/auth';
import { UserRole } from '../../../enums/enums';

const router = express.Router();

// router.post(
//   '/create-user',
//   validateRequest(userZodValidation.createUserZodSchema),
//   userControllers.createUser
// );
router.get('/get-users', auth('user'), userControllers.getAllUser);
router.get('/get-friends', auth(UserRole.USER), userControllers.getFriends);
router.get(
  '/get-suggestedFriends',
  auth(UserRole.USER),
  userControllers.getSuggestedFriends
);
router.get('/get-feed', auth(UserRole.USER), userControllers.userFeedPost);
router.delete('/delete-user/:id', userControllers.deleteUser);
router.get('/get-user', auth(UserRole.USER), userControllers.getSingleUser);
router.get(
  '/get-user/:userId',
  auth(UserRole.USER),
  userControllers.getSingleUserWithId
);
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
