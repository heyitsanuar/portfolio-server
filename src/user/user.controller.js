const { UserModel } = require('./user.model');

const updateUser = (user, userId) => new Promise((resolve, reject) => {
  UserModel.findOneAndUpdate({ _id: userId, email: user.email }, user, { new: true }, (err, updatedUser) => {
    if (err) return reject({ code: 500, message: 'Error when updating user.' });
    if (!updatedUser) return reject({ code: 404, message: 'User not found.' });

    return resolve({ code: 200, message: 'User updated successfully.' });
  });
});

const removeUser = userId => new Promise((resolve, reject) => {
  UserModel.findOneAndRemove({ _id: userId }, (err, removedUser) => {
    if (err) return reject({ code: 500, message: 'Error when removing user.' });
    if (!removedUser) return reject({ code: 404, message: 'User not found.' });

    return resolve({ code: 200, message: 'User removed successfully.' });
  });
});

const getUser = id => new Promise((resolve, reject) => {
  UserModel.findOne({ _id: id }, (err, foundUser) => {
    if (err) return reject({ code: 500, message: 'Error when finding user.' });
    if (!foundUser) return resolve({ code: 200, message: 'User not found.' });

    return resolve({ code: 200, data: foundUser });
  });
});

const getUsers = () => new Promise((resolve, reject) => {
  UserModel.find((error, foundUsers) => {
    if (error) return reject({ code: 500, message: 'Error when retrieving users.' });
    if (!foundUsers) return resolve({ code: 200, message: 'No users found' });

    return resolve({ code: 200, data: foundUsers });
  });
});

const hasMissingParams = ({
  name, surname, description, email, password,
}) => !name || !surname || !description || !email || !password;

const hasMissingParamsForLogin = ({ email, password }) => !email || !password;

module.exports = {
  updateUser,
  removeUser,
  getUser,
  getUsers,
  hasMissingParams,
  hasMissingParamsForLogin,
};
