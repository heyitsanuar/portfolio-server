import express, { Request, Response } from 'express';

import { RequestResponseType } from '@app/type/request.type';

import {
  getSkills, getSkill, saveSkill, hasMissingParams, editSkill, removeSkill,
} from './skill.controller';

import { sanitizeBody } from '@utils/sanitizer.util';

export const SkillRoutes = express.Router();

SkillRoutes.get(
  '/skill',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { code, data }: RequestResponseType = await getSkills();

      return res.status(code).send({ skills: data });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

SkillRoutes.get(
  '/skill/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const skillID: string = (req as any).sanitize(req.params.id);

    try {
      const { code, data }: RequestResponseType = await getSkill(skillID);

      return res.status(code).send({ ...data });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

SkillRoutes.post(
  '/skill',
  async (req: Request, res: Response): Promise<Response> => {
    const sanitizedSkill: any = sanitizeBody(req);

    try {
      if (hasMissingParams(sanitizedSkill)) throw { code: 400, message: 'Please fill in all the fields.' };

      const { code, data }: RequestResponseType = await saveSkill(sanitizedSkill);

      return res.status(code).send({ ...data });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

SkillRoutes.patch(
  '/skill/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const sanitizedSkill: any = sanitizeBody(req);
    const skillID: string = (req as any).sanitize(req.params.id);

    try {
      if (hasMissingParams(sanitizedSkill)) throw { code: 400, message: 'Please fill in all the fields.' };

      const { code, data }: RequestResponseType = await editSkill(sanitizedSkill, skillID);

      return res.status(code).send({ ...data });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

SkillRoutes.delete(
  '/skill/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const skillID: string = (req as any).sanitize(req.params.id);

    try {
      const { code, message }: RequestResponseType = await removeSkill(skillID);

      return res.status(code).send({ message });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);
