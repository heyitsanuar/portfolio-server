import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

export const SkillModel = mongoose.model('Skill', SkillSchema);
