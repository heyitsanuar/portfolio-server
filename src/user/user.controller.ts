import bcrypt from 'bcrypt';
import { Document } from 'mongoose';

import { UserModel } from './user.model';
import { UserType } from './user.type';
import { RequestResponseInterface } from '../app/interfaces/request.interface';

export const saveUser = (user: UserType): Promise<RequestResponseInterface> => {
    return new Promise((resolve, reject): void => {
        bcrypt.hash(user.password, null, (error: any, hash: string): void => {
            if (error) return reject({ code: 500, message: 'Error when creating user password.' });

            let newUser: Document = new UserModel(user);
            newUser.password = hash;

            newUser.save((err: Error, product: Document): void => {
                if (err) return reject({ code: 500, message: 'Error when creating user password.' });

                return resolve({ code: 200, data: product });
            });
        });
    });
};

export const updateUser = (user: UserType): Promise<RequestResponseInterface> => {
    return new Promise((resolve, reject): void => {
        UserModel.findOneAndUpdate({ email: user.email }, (err: Error, updatedUser: UserType): void => {
            if (err) return reject({ code: 500, message: 'Error when updating user.' });
            if (!updatedUser) return reject({ code: 404, message: 'User not found.' });

            return resolve({ code: 200, data: updatedUser });
        });
    });
};

export const getUser = ({ email }: UserType): Promise<RequestResponseInterface> => {
    return new Promise((resolve, reject): void => {
        UserModel.findOne({ email }, (err: Error, foundUser: UserType): void => {
            if (err) return reject({ code: 500, message: 'Error when finding user.' });
            if (!foundUser) return resolve({ code: 200, message: 'User not found.' });

            return resolve({ code: 200, data: foundUser });
        });
    });
};

export const getUsers = (): Promise<RequestResponseInterface> => {
    return new Promise((resolve, reject): void => {
        UserModel.find((error: Error, foundUsers: UserType[]): void => {
            if (error) return reject({ code: 500, message: 'Error when retrieving users.' });
            if (!foundUsers) return resolve({ code: 200, message: 'No users found' });

            return resolve({ code: 200, data: foundUsers });
        });
    });
};

export const hasMissingParams = ({ email, password, name, surname }: UserType): Error | boolean => {
    if (!email || !password || !name || !surname) throw { code: 200, message: 'Please fill in all the fields.' };

    return false;
};
