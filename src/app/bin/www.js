require('dotenv').config();
const mongoose = require('mongoose');
const { PORT } = require('../config/server.config');

const { DB_CONNECT_STRING } = require('../config/database.config');

const { AppController } = require('../app.controller');

const connectToDatabase = async () => {
  console.log(DB_CONNECT_STRING);
  try {
    await mongoose.connect(DB_CONNECT_STRING, { useNewUrlParser: true });
    AppController.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

connectToDatabase();
