import express from 'express';

import { UserRoutes } from '@user/user.routes';
import { SkillRoutes } from '@user/skills/skill.routes';
import { ProjectRoutes } from '@project/project.routes';
import { TechnologyRoutes } from '@technology/technology.routes';

export const AppRoutes = express.Router();

AppRoutes.use(UserRoutes);
AppRoutes.use(ProjectRoutes);
AppRoutes.use(TechnologyRoutes);
AppRoutes.use(SkillRoutes);
