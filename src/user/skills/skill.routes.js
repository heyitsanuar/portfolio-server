const express = require('express');

const {
  getSkills, getSkill, saveSkill, hasMissingParams, editSkill, removeSkill,
} = require('./skill.controller');

const { sanitizeBody } = require('../../app/utils/sanitizer.util');

const SkillRoutes = express.Router();

SkillRoutes.get('/skill', async (req, res) => {
  try {
    const { code, data } = await getSkills();

    return res.status(code).send({ skills: data });
  } catch ({ code, message }) {
    return res.status(code).send({ message });
  }
});

SkillRoutes.get('/skill/:id', async (req, res) => {
  const skillID = req.sanitize(req.params.id);

  try {
    const { code, data } = await getSkill(skillID);

    return res.status(code).send(data);
  } catch ({ code, message }) {
    return res.status(code).send({ message });
  }
});

SkillRoutes.post('/skill', async (req, res) => {
  const sanitizedSkill = sanitizeBody(req);

  try {
    if (hasMissingParams(sanitizedSkill)) throw { code: 400, message: 'Please fill in all the fields.' };

    const { code, data } = await saveSkill(sanitizedSkill);

    return res.status(code).send(data);
  } catch ({ code, message }) {
    return res.status(code).send({ message });
  }
});

SkillRoutes.patch('/skill/:id', async (req, res) => {
  const sanitizedSkill = sanitizeBody(req);
  const skillID = req.sanitize(req.params.id);

  try {
    if (hasMissingParams(sanitizedSkill)) throw { code: 400, message: 'Please fill in all the fields.' };

    const { code, data } = await editSkill(sanitizedSkill, skillID);

    return res.status(code).send(data);
  } catch ({ code, message }) {
    return res.status(code).send({ message });
  }
});

SkillRoutes.delete('/skill/:id', async (req, res) => {
  const skillID = req.sanitize(req.params.id);

  try {
    const { code, message } = await removeSkill(skillID);

    return res.status(code).send({ message });
  } catch ({ code, message }) {
    return res.status(code).send({ message });
  }
});

module.exports = {
  SkillRoutes,
};
