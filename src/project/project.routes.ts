import express, { Request, Response } from 'express';

import { sanitizeBody } from '@utils/sanitizer.util';
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
  async (req: Request, res: Response): Promise<object | Error> => {
    try {
      const { code, data }: any = await getProjects();

      return res.status(code).send({ ...data });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

ProjectRoutes.get(
  '/project/:id',
  async (req: Request, res: Response): Promise<object | Error> => {
    const projectID = (req as any).sanitize(req.params.id);

    try {
      const { code, data }: any = await getProject(projectID);

      return res.status(code).send({ ...data });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

ProjectRoutes.post(
  '/project',
  async (req: Request, res: Response): Promise<object | Error> => {
    const sanitizedProject: any = sanitizeBody(req);

    try {
      const project: any = hasMissingParams(sanitizedProject);

      if (!project) throw project;

      const { code, data }: any = await saveProject(project);

      return res.status(code).send({ ...data });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);

ProjectRoutes.put(
  '/project/:id',
  async (req: Request, res: Response): Promise<object | Error> => {
    const sanitizedProject: any = sanitizeBody(req);
    const projectID = (req as any).sanitize(req.params.id);

    try {
      const project: any = hasMissingParams(sanitizedProject);

      if (!project) throw project;

      const { code, data }: any = await editProject(project, projectID);

      return res.status(code).send({ ...data });
    } catch ({ code, message }) {
      return res.status(code).send({ message });
    }
  },
);
