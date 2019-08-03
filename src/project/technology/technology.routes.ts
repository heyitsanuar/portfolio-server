import express, { Request, Response } from 'express';

import { sanitizeBody } from '@utils/sanitizer.util';
import { RequestResponseType } from '@app/type/request.type';
import {
  hasMissingParams,
  getTechnologies,
  getTechnology,
  editTechnology,
  saveTechnology,
  removeTechnology,
} from './technology.controller';

export const TechnologyRoutes = express.Router();

TechnologyRoutes.get(
  '/technology',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { code, data }: RequestResponseType = await getTechnologies();

      return res.status(code).send({ technologies: data });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

TechnologyRoutes.get(
  '/technology/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const technologyID: string = (req as any).sanitize(req.params.id);

    try {
      const { code, data }: RequestResponseType = await getTechnology(technologyID);

      return res.status(code).send({ ...data });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

TechnologyRoutes.post(
  '/technology',
  async (req: Request, res: Response): Promise<Response> => {
    const sanitizedTechnology: any = sanitizeBody(req);

    try {
      if (hasMissingParams(sanitizedTechnology)) throw { code: 400, message: 'Please fill in all the fields.' };

      const { code, data }: RequestResponseType = await saveTechnology(sanitizedTechnology);

      return res.status(code).send({ ...data });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

TechnologyRoutes.patch(
  '/technology/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const sanitizedTechnology: any = sanitizeBody(req);
    const technologyID: string = (req as any).sanitize(req.params.id);

    try {
      if (hasMissingParams(sanitizedTechnology)) throw { code: 400, message: 'Please fill in all the fields.' };

      const { code, data }: RequestResponseType = await editTechnology(sanitizedTechnology, technologyID);

      return res.status(code).send({ ...data });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

TechnologyRoutes.delete(
  '/technology/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const technologyID: string = (req as any).sanitize(req.params.id);

    try {
      const { code, message }: RequestResponseType = await removeTechnology(technologyID);

      return res.status(code).send({ message });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);
