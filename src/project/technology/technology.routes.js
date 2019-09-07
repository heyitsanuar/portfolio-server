const express = require('express');

const { sanitizeBody } = require('../../app/utils/sanitizer.util');
const {
  hasMissingParams,
  getTechnologies,
  getTechnology,
  editTechnology,
  saveTechnology,
  removeTechnology,
} = require('./technology.controller');

const TechnologyRoutes = express.Router();

TechnologyRoutes.get('/technology', async (req, res) => {
  try {
    const { code, data } = await getTechnologies();

    return res.status(code).send({ technologies: data });
  } catch ({ code, message }) {
    return res.status(code).send({ message });
  }
});

TechnologyRoutes.get('/technology/:id', async (req, res) => {
  const technologyID = req.sanitize(req.params.id);

  try {
    const { code, data } = await getTechnology(technologyID);

    return res.status(code).send(data);
  } catch ({ code, message }) {
    return res.status(code).send({ message });
  }
});

TechnologyRoutes.post('/technology', async (req, res) => {
  const sanitizedTechnology = sanitizeBody(req);

  try {
    if (hasMissingParams(sanitizedTechnology)) throw { code: 400, message: 'Please fill in all the fields.' };

    const { code, data } = await saveTechnology(sanitizedTechnology);

    return res.status(code).send(data);
  } catch ({ code, message }) {
    return res.status(code).send({ message });
  }
});

TechnologyRoutes.patch('/technology/:id', async (req, res) => {
  const sanitizedTechnology = sanitizeBody(req);
  const technologyID = req.sanitize(req.params.id);

  try {
    const { code, data } = await editTechnology(sanitizedTechnology, technologyID);

    return res.status(code).send(data);
  } catch ({ code, message }) {
    return res.status(code).send({ message });
  }
});

TechnologyRoutes.delete('/technology/:id', async (req, res) => {
  const technologyID = req.sanitize(req.params.id);

  try {
    const { code, message } = await removeTechnology(technologyID);

    return res.status(code).send({ message });
  } catch ({ code, message }) {
    return res.status(code).send({ message });
  }
});

module.exports = {
  TechnologyRoutes,
};
