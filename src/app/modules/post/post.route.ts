import express from 'express';
import auth from '../../middlewar/auth';
import { UserRole } from '../../../enums/enums';
import validateRequest from '../../middlewar/validateRequest';
import { PostValidation } from './post.validation';
import { PostControllers } from './post.controller';

const router = express.Router();

router.post(
  '/create-post',
  auth(UserRole.USER),
  validateRequest(PostValidation.createPostZodSchema),
  PostControllers.createPost
);
router.post(
  '/create-comment/:postId',
  auth(UserRole.USER),
  validateRequest(PostValidation.createCommentZodSchema),
  PostControllers.createCommentToPost
);
router.post(
  '/like-dislike/:postId',
  auth(UserRole.USER),
  PostControllers.postLikeDislike
);

export const postRoutes = router;
