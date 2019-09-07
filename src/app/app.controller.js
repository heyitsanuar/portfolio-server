const express = require('express');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const { AppRoutes } = require('./app.routes');

const AppController = express();

AppController.use(expressSanitizer());
AppController.use(bodyParser.json());
AppController.use(bodyParser.urlencoded({ extended: true }));

// Setting CORS and HEADERS permits
AppController.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Cookies, Accept, Access-Control-Allow-Request-Method',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PATCH, DELETE');
  next();
});

AppController.use('/api', AppRoutes);

// Handling 404 requests
AppController.use((req, res) => {
  res.send({ message: 'Endpoint not found.' });
});

module.exports = {
  AppController,
};
