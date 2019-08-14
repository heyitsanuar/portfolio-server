import express, { Request, Response } from 'express';

import { sanitizeBody } from '@utils/sanitizer.util';
import { RequestResponseType } from '@app/type/request.type';
import {
  getProjects,
  getProject,
  saveProject,
  editProject,
  removeProject,
  hasMissingParams,
} from './project.controller';

export const ProjectRoutes = express.Router();

ProjectRoutes.get(
  '/project',
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { code, data }: RequestResponseType = await getProjects();

      return res.status(code).send({ projects: data });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

ProjectRoutes.get(
  '/project/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const projectID: string = (req as any).sanitize(req.params.id);

    try {
      const { code, data }: RequestResponseType = await getProject(projectID);

      return res.status(code).send(data);
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

ProjectRoutes.post(
  '/project',
  async (req: Request, res: Response): Promise<Response> => {
    const sanitizedProject: any = sanitizeBody(req);

    try {
      if (hasMissingParams(sanitizedProject)) throw { code: 400, message: 'Please fill in all the fields.' };

      const { code, data }: RequestResponseType = await saveProject(sanitizedProject);

      return res.status(code).send(data);
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

ProjectRoutes.patch(
  '/project/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const projectID: string = (req as any).sanitize(req.params.id);

    try {
      const { code, data }: RequestResponseType = await editProject(req.body, projectID);

      return res.status(code).send(data);
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

ProjectRoutes.delete(
  '/project/:id',
  async (req: Request, res: Response): Promise<Response> => {
    const projectID: string = (req as any).sanitize(req.params.id);

    try {
      const { code, message }: RequestResponseType = await removeProject(projectID);

      return res.status(code).send({ message });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);
