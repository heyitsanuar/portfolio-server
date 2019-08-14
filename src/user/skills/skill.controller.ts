import { SkillType } from './skill.type';
import { RequestResponseType } from '@app/type/request.type';

import { SkillModel } from './skill.model';

export const getSkills = (): Promise<RequestResponseType> => new Promise((resolve, reject) => {
  SkillModel.find((err: Error, foundSkills: SkillType[]): void => {
    if (err) return reject({ code: 500, message: 'Error when retrieving skills.' });

    return resolve({ code: 200, data: foundSkills });
  });
});

export const getSkill = (id: string): Promise<RequestResponseType> => new Promise((resolve, reject) => {
  SkillModel.findOne({ _id: id }, (err: Error, foundSkill: SkillType): void => {
    if (err) return reject({ code: 500, message: 'Error when retrieving skill.' });
    if (!foundSkill) return reject({ code: 404, message: 'Skill not found.' });

    return resolve({ code: 200, data: foundSkill });
  });
});

export const saveSkill = (skill: SkillType): Promise<RequestResponseType> => new Promise((resolve, reject) => {
  const newSkill: any = new SkillModel(skill);

  newSkill.save((err: Error, savedSkill: SkillType): void => {
    if (err) return reject({ code: 500, message: 'Error when saving skill.' });
    if (!savedSkill) return reject({ code: 404, message: 'Skill could not be saved.' });

    return resolve({ code: 200, data: savedSkill });
  });
});

export const editSkill = (skill: SkillType, skillId: string): Promise<RequestResponseType> => new Promise((resolve, reject) => {
  SkillModel.findOneAndUpdate({ _id: skillId }, skill, (err: Error, foundSkill: any): void => {
    if (err) return reject({ code: 500, message: 'Error when editing skill.' });
    if (!foundSkill) return reject({ code: 404, message: 'Skill not found.' });

    return resolve({ code: 200, data: foundSkill });
  });
});

export const removeSkill = (skillId: string): Promise<RequestResponseType> => new Promise((resolve, reject) => {
  SkillModel.findOneAndRemove({ _id: skillId }, (err: Error, foundSkill: any): void => {
    if (err) return reject({ code: 500, message: 'Error when removing skills.' });
    if (!foundSkill) return reject({ code: 404, message: 'Skill not found.' });

    return resolve({ code: 200, message: 'Skill removed successfully.' });
  });
});

export const hasMissingParams = ({ title, rate }: SkillType): boolean => {
  return (!title || !rate);
};
