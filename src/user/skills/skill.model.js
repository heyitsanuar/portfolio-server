const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  rate: {
    type: String,
    required: true,
  },
  isSoftSkill: {
    type: Boolean,
    default: false,
  },
});

const SkillModel = mongoose.model('Skill', SkillSchema);

module.exports = {
  SkillModel,
};
