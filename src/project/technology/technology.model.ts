import mongoose from 'mongoose';

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

export const TechnologyModel = mongoose.model('Technology', TechnologySchema);
