import bcrypt from 'bcrypt';
import { Document } from 'mongoose';

import { RequestResponseType } from '@app/type/request.type';
import { UserModel } from './user.model';
import { UserType } from './user.type';

export const saveUser = (user: UserType): Promise<RequestResponseType> => new Promise((resolve, reject): void => {
  bcrypt.hash(user.password, 2, (error: any, hash: string): void => {
    if (error) return reject({ code: 500, message: 'Error when creating user password.' });

    const newUser: any = new UserModel(user);
    newUser.password = hash;

    newUser.save((err: Error, product: Document): void => {
      if (err) return reject({ code: 500, message: 'Error when creating user password.' });

      return resolve({ code: 200, message: 'User registered successfully.' });
    });
  });
});

export const updateUser = (user: UserType, userId: string): Promise<RequestResponseType> => new Promise((resolve, reject): void => {
  UserModel.findOneAndUpdate(
    { _id: userId, email: user.email },
    user,
    { new: true },
    (err: Error, updatedUser: any): void => {
      if (err) return reject({ code: 500, message: 'Error when updating user.' });
      if (!updatedUser) return reject({ code: 404, message: 'User not found.' });

      return resolve({ code: 200, message: 'User updated successfully.' });
    },
  );
});

export const removeUser = (userId: string): Promise<RequestResponseType> => new Promise((resolve, reject): void => {
  UserModel.findOneAndRemove({ _id: userId }, (err: Error, removedUser: any): void => {
    if (err) return reject({ code: 500, message: 'Error when removing user.' });
    if (!removedUser) return reject({ code: 404, message: 'User not found.' });

    return resolve({ code: 200, message: 'User removed successfully.' });
  });
});

export const getUser = (id: string): Promise<RequestResponseType> => new Promise((resolve, reject): void => {
  UserModel.findOne({ _id: id }, (err: Error, foundUser: UserType): void => {
    if (err) return reject({ code: 500, message: 'Error when finding user.' });
    if (!foundUser) return resolve({ code: 200, message: 'User not found.' });

    return resolve({ code: 200, data: foundUser });
  });
});

export const getUsers = (): Promise<RequestResponseType> => new Promise((resolve, reject): void => {
  UserModel.find((error: Error, foundUsers: UserType[]): void => {
    if (error) return reject({ code: 500, message: 'Error when retrieving users.' });
    if (!foundUsers) return resolve({ code: 200, message: 'No users found' });

    return resolve({ code: 200, data: foundUsers });
  });
});

export const hasMissingParams = ({
  name, surname, description, email, password,
}: UserType): boolean => !name || !surname || !description || !email || !password;

export const hasMissingParamsForLogin = ({ email, password }: UserType): boolean => !email || !password;
