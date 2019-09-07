const { TechnologyModel } = require('./technology.model');

const getTechnologies = () => new Promise((resolve, reject) => {
  TechnologyModel.find((err, foundTechnologies) => {
    if (err) return reject({ code: 500, message: 'Error when searching for technologies.' });

    return resolve({ code: 200, data: foundTechnologies });
  });
});

const getTechnology = id => new Promise((resolve, reject) => {
  TechnologyModel.findOne({ _id: id }, (err, foundTechnology) => {
    if (err) return reject({ code: 500, message: 'Error when searching for technologies.' });
    if (!foundTechnology) return reject({ code: 404, message: 'Technology not found.' });

    return resolve({ code: 200, data: foundTechnology });
  });
});

const saveTechnology = technology => new Promise((resolve, reject) => {
  const newTechnology = new TechnologyModel(technology);

  newTechnology.save((err, savedTechnology) => {
    if (err) return reject({ code: 500, message: 'Error when saving technology.' });
    if (!savedTechnology) return reject({ code: 404, message: 'Technology could not be saved.' });

    return resolve({ code: 200, data: savedTechnology });
  });
});

const editTechnology = (technology, id) => new Promise((resolve, reject) => {
  TechnologyModel.findOneAndUpdate({ _id: id }, technology, { new: true }, (err, updatedTechnology) => {
    if (err) return reject({ code: 500, message: 'Error when updating technology.' });
    if (!updatedTechnology) return reject({ code: 404, message: 'Technology could not be edited.' });

    return resolve({ code: 200, data: updatedTechnology });
  });
});

const removeTechnology = id => new Promise((resolve, reject) => {
  TechnologyModel.findByIdAndRemove({ _id: id }, (err, removedTechnology) => {
    if (err) return reject({ code: 500, message: 'Error when removing technology.' });
    if (!removedTechnology) return reject({ code: 404, message: 'Technology not found.' });

    return resolve({ code: 200, message: 'Technology removed successfully.' });
  });
});

const hasMissingParams = ({ title, url }) => !title || !url;

module.exports = {
  getTechnologies,
  getTechnology,
  saveTechnology,
  editTechnology,
  removeTechnology,
  hasMissingParams,
};
