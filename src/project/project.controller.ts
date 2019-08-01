import { ProjectModel } from './project.model';

i;

export const getProjects = () => new Promise((resolve, reject) => {
  ProjectModel.find((err: Error, foundProjects: ProjectType[]): void => {
    if (err) return reject({ code: 500, message: 'Error when searching for projects.' });

    return resolve({ code: 200, data: foundProjects });
  });
});

export const getProject = (id: string) => new Promise((resolve, reject) => {
  ProjectModel.findOne({ _id: id }, (err: Error, foundProject: ProjectType): void => {
    if (err) return reject({ code: 500, message: 'Error when searching for project.' });
    if (!foundProject) return reject({ code: 404, message: 'Project not found.' });

    return resolve({ code: 200, data: foundProject });
  });
});

export const saveProject = (project: ProjectType) => new Promise((resolve, reject) => {
  const newProject: any = new ProjectModel(project);

  newProject.save((err: Error, savedProject: ProjectType): void => {
    if (err) return reject({ code: 500, message: 'Error when saving project.' });
    if (!savedProject) return reject({ code: 404, message: 'Project could not be saved.' });

    return resolve({ code: 200, data: savedProject });
  });
});

export const editProject = (project: ProjectType, id: string) => new Promise((resolve, reject) => {
  ProjectModel.findOneAndUpdate({ _id: id }, project, (err: Error, updatedProject: any): void => {
    if (err) return reject({ code: 500, message: 'Error when updating project.' });
    if (!updatedProject) return reject({ code: 404, message: 'Project could not be edited.' });

    return resolve({ code: 200, data: updatedProject });
  });
});

export const removeProject = (id: string) => new Promise((resolve, reject) => {
  ProjectModel.findByIdAndRemove({ _id: id }, (err: Error, removedProject: any): void => {
    if (err) return reject({ code: 500, message: 'Error when removing project.' });
    if (!removedProject) return reject({ code: 404, message: 'Project not found.' });

    return resolve({ code: 200, message: 'Project removed successfully.' });
  });
});

export const hasMissingParams = ({ title, description, info }: ProjectType): Error | boolean => {
  if (!title || !description || !info) {
    throw { code: 200, message: 'Please fill in all the fields.' };
  }

  return false;
};
