const { ProjectModel } = require('./project.model');

const getProjects = () => new Promise((resolve, reject) => {
  ProjectModel.find()
    .populate('technologies')
    .exec((err, foundProjects) => {
      if (err) return reject({ code: 500, message: 'Error when searching for projects.' });

      return resolve({ code: 200, data: foundProjects });
    });
});

const getProject = id => new Promise((resolve, reject) => {
  ProjectModel.findOne({ _id: id })
    .populate('technologies')
    .exec((err, foundProject) => {
      if (err) return reject({ code: 500, message: 'Error when searching for project.' });
      if (!foundProject) return reject({ code: 404, message: 'Project not found.' });

      return resolve({ code: 200, data: foundProject });
    });
});

const saveProject = project => new Promise((resolve, reject) => {
  const newProject = new ProjectModel(project);

  newProject
    .save()
    .populate('technologies')
    .exec((err, savedProject) => {
      if (err) return reject({ code: 500, message: 'Error when saving project.' });
      if (!savedProject) return reject({ code: 404, message: 'Project could not be saved.' });

      return resolve({ code: 200, data: savedProject });
    });
});

const editProject = (project, id) => new Promise((resolve, reject) => {
  ProjectModel.findOneAndUpdate({ _id: id }, project, { new: true })
    .populate('technologies')
    .exec((err, updatedProject) => {
      if (err) return reject({ code: 500, message: 'Error when updating project.' });
      if (!updatedProject) return reject({ code: 404, message: 'Project could not be edited.' });

      return resolve({ code: 200, data: updatedProject });
    });
});

const removeProject = id => new Promise((resolve, reject) => {
  ProjectModel.findByIdAndRemove({ _id: id }, (err, removedProject) => {
    if (err) return reject({ code: 500, message: 'Error when removing project.' });
    if (!removedProject) return reject({ code: 404, message: 'Project not found.' });

    return resolve({ code: 200, message: 'Project removed successfully.' });
  });
});

const hasMissingParams = ({ title, description, info }) => !title || !description || !info;

module.exports = {
  getProjects,
  getProject,
  saveProject,
  editProject,
  removeProject,
  hasMissingParams,
};
