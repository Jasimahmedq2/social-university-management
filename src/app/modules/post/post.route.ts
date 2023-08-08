import express from 'express';
import auth from '../../middlewar/auth';
import { UserRole } from '../../../enums/enums';
import validateRequest from '../../middlewar/validateRequest';
import { PostValidation } from './post.validation';
import { PostControllers } from './post.controller';
import upload from '../../middlewar/multer';

const router = express.Router();

router.post(
  '/create-post',
  auth(UserRole.USER),
  validateRequest(PostValidation.createPostZodSchema),
  upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 5 },
    { name: 'audios', maxCount: 5 },
  ]),
  PostControllers.createPost
);
router.get('/get-posts', auth(UserRole.USER), PostControllers.getAllPost);
router.get(
  '/get-user-profile-post/:userId',
  auth(UserRole.USER),
  PostControllers.getUserAllPost
);
router.get(
  '/get-post/:postId',
  auth(UserRole.USER),
  PostControllers.getSinglePost
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
router.delete(
  '/delete-post/:postId',
  auth(UserRole.USER),
  PostControllers.deletePost
);
router.patch(
  '/update-post/:postId',
  auth(UserRole.USER),
  PostControllers.updatePost
);

export const postRoutes = router;
