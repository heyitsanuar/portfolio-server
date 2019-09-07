const express = require('express');

const {
  getUser, removeUser, updateUser, hasMissingParamsForLogin,
} = require('./user.controller');

const { sanitizeBody } = require('../app/utils/sanitizer.util');

const UserRoutes = express.Router();

UserRoutes.patch('/user/:id', async (req, res) => {
  const sanitizedUser = sanitizeBody(req);
  const userID = req.sanitize(req.params.id);

  try {
    const { code, message } = await updateUser(sanitizedUser, userID);

    return res.status(code).send({ message });
  } catch ({ code, message }) {
    return res.status(code).send({ message });
  }
});

UserRoutes.delete('/user/:id', async (req, res) => {
  const userID = req.sanitize(req.params.id);

  try {
    const { code, message } = await removeUser(userID);

    return res.status(code).send({ message });
  } catch ({ code, message }) {
    return res.status(code).send({ message });
  }
});

UserRoutes.post('/user/login', async (req, res) => {
  const sanitizedUser = sanitizeBody(req);

  try {
    if (hasMissingParamsForLogin(sanitizedUser)) throw { code: 400, message: 'Please fill in all the fields.' };

    const { code, data } = await getUser(sanitizedUser);

    return res.status(code).send(data);
  } catch ({ code, message }) {
    return res.status(code).send({ message });
  }
});

UserRoutes.get('/user/anuar', async (req, res) => {
  try {
    const { code, data } = await getUser('5d45e21582920ac348240cf7');

    return res.status(code).send(data);
  } catch ({ code, message }) {
    return res.status(code).send({ message });
  }
});

module.exports = {
  UserRoutes,
};
