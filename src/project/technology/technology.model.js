const mongoose = require('mongoose');

const TechnologySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const TechnologyModel = mongoose.model('Technology', TechnologySchema);

module.exports = {
  TechnologyModel,
};
