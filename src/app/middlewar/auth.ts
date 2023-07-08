/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { NextFunction, Request, Response } from 'express';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../errors/apiErrors';

const auth =
  (...Roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      let verifiedToken = null;
      verifiedToken = jwtHelpers.verifyToken(
        token as string,
        config.jwt.access_secret as Secret
      );

      if (!verifiedToken) {
        throw new ApiError(400, 'token invalid');
      }

      req.user = verifiedToken;

      if (Roles.length && !Roles.includes(verifiedToken.role)) {
        throw new ApiError(401, 'unauthorized user');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
