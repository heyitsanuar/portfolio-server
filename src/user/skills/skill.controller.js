const { SkillModel } = require('./skill.model');

const getSkills = () => new Promise((resolve, reject) => {
  SkillModel.find((err, foundSkills) => {
    if (err) return reject({ code: 500, message: 'Error when retrieving skills.' });

    return resolve({ code: 200, data: foundSkills });
  });
});

const getSkill = id => new Promise((resolve, reject) => {
  SkillModel.findOne({ _id: id }, (err, foundSkill) => {
    if (err) return reject({ code: 500, message: 'Error when retrieving skill.' });
    if (!foundSkill) return reject({ code: 404, message: 'Skill not found.' });

    return resolve({ code: 200, data: foundSkill });
  });
});

const saveSkill = skill => new Promise((resolve, reject) => {
  const newSkill = new SkillModel(skill);

  newSkill.save((err, savedSkill) => {
    if (err) return reject({ code: 500, message: 'Error when saving skill.' });
    if (!savedSkill) return reject({ code: 404, message: 'Skill could not be saved.' });

    return resolve({ code: 200, data: savedSkill });
  });
});

const editSkill = (skill, skillId) => new Promise((resolve, reject) => {
  SkillModel.findOneAndUpdate({ _id: skillId }, skill, (err, foundSkill) => {
    if (err) return reject({ code: 500, message: 'Error when editing skill.' });
    if (!foundSkill) return reject({ code: 404, message: 'Skill not found.' });

    return resolve({ code: 200, data: foundSkill });
  });
});

const removeSkill = skillId => new Promise((resolve, reject) => {
  SkillModel.findOneAndRemove({ _id: skillId }, (err, foundSkill) => {
    if (err) return reject({ code: 500, message: 'Error when removing skills.' });
    if (!foundSkill) return reject({ code: 404, message: 'Skill not found.' });

    return resolve({ code: 200, message: 'Skill removed successfully.' });
  });
});

const hasMissingParams = ({ title, rate }) => !title || !rate;

module.exports = {
  getSkill,
  getSkills,
  saveSkill,
  editSkill,
  removeSkill,
  hasMissingParams,
};
