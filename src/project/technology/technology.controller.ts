import { RequestResponseType } from '@app/type/request.type';
import { TechnologyModel } from './technology.model';
import { TechnologyType } from './technology.type';

export const getTechnologies = (): Promise<RequestResponseType> => new Promise((resolve, reject) => {
  TechnologyModel.find((err: Error, foundTechnologies: TechnologyType[]): void => {
    if (err) return reject({ code: 500, message: 'Error when searching for technologies.' });

    return resolve({ code: 200, data: foundTechnologies });
  });
});

export const getTechnology = (id: string): Promise<RequestResponseType> => new Promise((resolve, reject) => {
  TechnologyModel.findOne({ _id: id }, (err: Error, foundTechnology: TechnologyType): void => {
    if (err) return reject({ code: 500, message: 'Error when searching for technologies.' });
    if (!foundTechnology) return reject({ code: 404, message: 'Technology not found.' });

    return resolve({ code: 200, data: foundTechnology });
  });
});

export const saveTechnology = (technology: TechnologyType): Promise<RequestResponseType> => new Promise((resolve, reject) => {
  const newTechnology: any = new TechnologyModel(technology);

  newTechnology.save((err: Error, savedTechnology: TechnologyType): void => {
    if (err) return reject({ code: 500, message: 'Error when saving technology.' });
    if (!savedTechnology) return reject({ code: 404, message: 'Technology could not be saved.' });

    return resolve({ code: 200, data: savedTechnology });
  });
});

export const editTechnology = (technology: TechnologyType, id: string): Promise<RequestResponseType> => new Promise((resolve, reject) => {
  TechnologyModel.findOneAndUpdate({ _id: id }, technology, (err: Error, updatedTechnology: any): void => {
    if (err) return reject({ code: 500, message: 'Error when updating technology.' });
    if (!updatedTechnology) return reject({ code: 404, message: 'Technology could not be edited.' });

    return resolve({ code: 200, data: updatedTechnology });
  });
});

export const removeTechnology = (id: string): Promise<RequestResponseType> => new Promise((resolve, reject) => {
  TechnologyModel.findByIdAndRemove({ _id: id }, (err: Error, removedTechnology: any): void => {
    if (err) return reject({ code: 500, message: 'Error when removing technology.' });
    if (!removedTechnology) return reject({ code: 404, message: 'Technology not found.' });

    return resolve({ code: 200, message: 'Technology removed successfully.' });
  });
});

export const hasMissingParams = ({ title, url }: TechnologyType): boolean => !title || !url;
