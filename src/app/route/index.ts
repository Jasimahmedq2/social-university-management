import express from 'express';
import { userRoutes } from '../modules/Users/user.route';
import { authRoutes } from '../modules/auth/auth.route';

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
];

MainRoutes.forEach(route => router.use(route.path, route.element));
export const MainRouter = router;
