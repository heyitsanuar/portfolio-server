const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  links: {
    webpage: String,
    repo: String,
  },
  images: {
    hq: String,
    mq: String,
    lq: String,
  },
  technologies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Technology',
    },
  ],
  isInitial: {
    type: Boolean,
    default: true,
  },
});

const ProjectModel = mongoose.model('Project', ProjectSchema);

module.exports = {
  ProjectModel,
};
