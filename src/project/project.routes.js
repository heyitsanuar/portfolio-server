const express = require('express');

const { sanitizeBody } = require('../app/utils/sanitizer.util');
const {
  getProjects,
  getProject,
  saveProject,
  editProject,
  removeProject,
  hasMissingParams,
} = require('./project.controller');

const ProjectRoutes = express.Router();

ProjectRoutes.get('/project', async (req, res) => {
  try {
    const { code, data } = await getProjects();

    return res.status(code).send({ projects: data });
  } catch ({ code, message }) {
    return res.status(code).send({ message });
  }
});

ProjectRoutes.get('/project/:id', async (req, res) => {
  const projectID = req.sanitize(req.params.id);

  try {
    const { code, data } = await getProject(projectID);

    return res.status(code).send(data);
  } catch ({ code, message }) {
    return res.status(code).send({ message });
  }
});

ProjectRoutes.post('/project', async (req, res) => {
  const sanitizedProject = sanitizeBody(req);

  try {
    if (hasMissingParams(sanitizedProject)) throw { code: 400, message: 'Please fill in all the fields.' };

    const { code, data } = await saveProject(sanitizedProject);

    return res.status(code).send(data);
  } catch ({ code, message }) {
    return res.status(code).send({ message });
  }
});

ProjectRoutes.patch('/project/:id', async (req, res) => {
  const projectID = req.sanitize(req.params.id);

  try {
    const { code, data } = await editProject(req.body, projectID);

    return res.status(code).send(data);
  } catch ({ code, message }) {
    return res.status(code).send({ message });
  }
});

ProjectRoutes.delete('/project/:id', async (req, res) => {
  const projectID = req.sanitize(req.params.id);

  try {
    const { code, message } = await removeProject(projectID);

    return res.status(code).send({ message });
  } catch ({ code, message }) {
    return res.status(code).send({ message });
  }
});

module.exports = {
  ProjectRoutes,
};
