const express = require('express');

const { UserRoutes } = require('../user/user.routes');
const { SkillRoutes } = require('../user/skills/skill.routes');
const { ProjectRoutes } = require('../project/project.routes');
const { TechnologyRoutes } = require('../project/technology/technology.routes');

const AppRoutes = express.Router();

AppRoutes.use(UserRoutes);
AppRoutes.use(ProjectRoutes);
AppRoutes.use(TechnologyRoutes);
AppRoutes.use(SkillRoutes);

module.exports = {
  AppRoutes,
};
