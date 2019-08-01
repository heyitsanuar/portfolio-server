import express, { Request, Response } from 'express';

import { sanitizeBody } from '@utils/sanitizer.util';
import {
  saveUser, hasMissingParams, getUser, removeUser, updateUser,
} from './user.controller';

export const UserRoutes = express.Router();

UserRoutes.patch(
  '/users/:id',
  async (req, res): Promise<object | Error> => {
    const userID: any = (req as any).sanitize(req.params.id);
    const sanitizedUser: any = sanitizeBody(req);

    try {
      const user: any = hasMissingParams(sanitizedUser);

      if (!user) {
        throw user;
      }

      const { code, message }: any = await updateUser(user, userID);

      return res.status(code).send({ message });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

UserRoutes.delete(
  '/users/:id',
  async (req, res): Promise<object | Error> => {
    const userID = (req as any).sanitize(req.params.id);

    try {
      const { code, message }: any = await removeUser(userID);

      return res.status(code).send({ message });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

UserRoutes.post(
  '/users/login',
  async (req: Request, res: Response): Promise<object | Error> => {
    const sanitizedUser: any = sanitizeBody(req);

    try {
      const user: any = hasMissingParams(sanitizedUser);

      if (!user) {
        throw user;
      }

      const { code, data }: any = await getUser(user);

      return res.status(code).send({ ...data });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

UserRoutes.post(
  '/users/register',
  async (req: Request, res: Response): Promise<object | Error> => {
    const sanitizedUser: any = sanitizeBody(req);

    try {
      const user: any = hasMissingParams(sanitizedUser);

      if (!user) {
        throw user;
      }

      const { code, message }: any = await saveUser(user);

      return res.status(code).send({ message });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);
