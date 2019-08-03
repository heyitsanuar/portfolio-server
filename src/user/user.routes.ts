import express, { Request, Response } from 'express';

import { RequestResponseType } from '@app/type/request.type';

import {
  saveUser, hasMissingParams, getUser, removeUser, updateUser, hasMissingParamsForLogin,
} from './user.controller';

import { sanitizeBody } from '@utils/sanitizer.util';

export const UserRoutes = express.Router();

UserRoutes.patch(
  '/user/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const sanitizedUser: any = sanitizeBody(req);
    const userID: string = (req as any).sanitize(req.params.id);

    try {
      const { code, message }: RequestResponseType = await updateUser(sanitizedUser, userID);

      return res.status(code).send({ message });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

UserRoutes.delete(
  '/user/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const userID: string = (req as any).sanitize(req.params.id);

    try {
      const { code, message }: RequestResponseType = await removeUser(userID);

      return res.status(code).send({ message });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

UserRoutes.post(
  '/user/login',
  async (req: Request, res: Response): Promise<Response> => {
    const sanitizedUser: any = sanitizeBody(req);

    try {
      if (hasMissingParamsForLogin(sanitizedUser)) throw { code: 400, message: 'Please fill in all the fields.' };

      const { code, data }: RequestResponseType = await getUser(sanitizedUser);

      return res.status(code).send(data);
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

UserRoutes.post(
  '/user/register',
  async (req: Request, res: Response): Promise<Response> => {
    const sanitizedUser: any = sanitizeBody(req);

    try {
      if (hasMissingParams(sanitizedUser)) throw { code: 400, message: 'Please fill in all the fields.' };

      const { code, message }: RequestResponseType = await saveUser(sanitizedUser);

      return res.status(code).send({ message });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);