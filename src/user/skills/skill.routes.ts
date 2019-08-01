import express, { Request, Response } from 'express';

import { sanitizeBody } from '@utils/sanitizer.util';
import {
  getSkills, getSkill, saveSkill, hasMissingParams, editSkill, removeSkill,
} from './skill.controller';

export const SkillRoutes = express.Router();

SkillRoutes.get(
  '/skill',
  async (req: Request, res: Response): Promise<object | Error> => {
    try {
      const { code, data }: any = await getSkills();

      return res.status(code).send([...data]);
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

SkillRoutes.get(
  '/skill/:id',
  async (req: Request, res: Response): Promise<object | Error> => {
    const skillID = (req as any).sanitize(req.params.id);

    try {
      const { code, data }: any = await getSkill(skillID);

      return res.status(code).send({ ...data });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

SkillRoutes.post(
  '/skill',
  async (req: Request, res: Response): Promise<object | Error> => {
    const sanitizedSkill: any = sanitizeBody(req);

    try {
      const { code, data }: any = await saveSkill(sanitizedSkill);

      return res.status(code).send({ ...data });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

SkillRoutes.put(
  '/skill/:id',
  async (req: Request, res: Response): Promise<object | Error> => {
    const sanitizedSkill: any = sanitizeBody(req);
    const skillID: any = (req as any).sanitize(req.params.id);

    try {
      const skill: any = hasMissingParams(sanitizedSkill);

      if (!skill) throw skill;

      const { code, data }: any = await editSkill(skill, skillID);

      return res.status(code).send({ ...data });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

SkillRoutes.delete(
  '/skill/:id',
  async (req: Request, res: Response): Promise<object | Error> => {
    const skillID: any = (req as any).sanitize(req.params.id);

    try {
      const { code, message }: any = await removeSkill(skillID);

      return res.status(code).send({ message });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);
