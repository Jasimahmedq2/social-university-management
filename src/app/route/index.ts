import express from 'express';
import { userRoutes } from '../modules/Users/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { postRoutes } from '../modules/post/post.route';
import { messageRoutes } from '../modules/message/message.route';

const router = express.Router();

const MainRoutes = [
  {
    path: '/users',
    element: userRoutes,
  },
  {
    path: '/auth',
    element: authRoutes,
  },
  {
    path: '/post',
    element: postRoutes,
  },
  {
    path: '/message',
    element: messageRoutes,
  },
];

MainRoutes.forEach(route => router.use(route.path, route.element));
export const MainRouter = router;
