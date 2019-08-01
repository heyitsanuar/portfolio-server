import express from 'express';

import { UserRoutes } from '@user/user.routes';

export const AppRoutes = express.Router();

AppRoutes.use(UserRoutes);
