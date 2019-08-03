import bcrypt from 'bcrypt';
import { Document } from 'mongoose';

import { UserModel } from './user.model';
import { UserType } from './user.type';
import { RequestResponseType } from '@app/type/request.type';

export const saveUser = (user: UserType): Promise<RequestResponseType> => {
    return new Promise((resolve, reject): void => {
        bcrypt.hash(user.password, null, (error: any, hash: string): void => {
            if (error) return reject({ code: 500, message: 'Error when creating user password.' });

            let newUser: any = new UserModel(user);
            newUser.password = hash;

            newUser.save((err: Error, product: Document): void => {
                if (err) return reject({ code: 500, message: 'Error when creating user password.' });

                return resolve({ code: 200, message: 'User registered successfully.' });
            });
        });
    });
};

export const updateUser = (user: UserType, userId: string): Promise<RequestResponseType> => {
    return new Promise((resolve, reject): void => {
        UserModel.findOneAndUpdate({ _id: userId, email: user.email }, (err: Error, updatedUser: UserType): void => {
            if (err) return reject({ code: 500, message: 'Error when updating user.' });
            if (!updatedUser) return reject({ code: 404, message: 'User not found.' });

            return resolve({ code: 200, data: updatedUser });
        });
    });
};

export const removeUser = (userId: string): Promise<RequestResponseType> => {
    return new Promise((resolve, reject): void => {
        UserModel.findOneAndRemove({ _id: userId }, (err: Error, removedUser: any): void => {
            if (err) return reject({ code: 500, message: 'Error when removing user.' });
            if (!removedUser) return reject ({ code: 404, message: 'User not found.' });

            return resolve({ code: 200, message: 'User removed successfully.' });
        });
    })
}

export const getUser = ({ email }: UserType): Promise<RequestResponseType> => {
    return new Promise((resolve, reject): void => {
        UserModel.findOne({ email }, (err: Error, foundUser: UserType): void => {
            if (err) return reject({ code: 500, message: 'Error when finding user.' });
            if (!foundUser) return resolve({ code: 200, message: 'User not found.' });

            return resolve({ code: 200, data: foundUser });
        });
    });
};

export const getUsers = (): Promise<RequestResponseType> => {
    return new Promise((resolve, reject): void => {
        UserModel.find((error: Error, foundUsers: UserType[]): void => {
            if (error) return reject({ code: 500, message: 'Error when retrieving users.' });
            if (!foundUsers) return resolve({ code: 200, message: 'No users found' });

            return resolve({ code: 200, data: foundUsers });
        });
    });
};

export const hasMissingParams = ({ name, surname, description, email, password }: UserType): boolean => {
    return (!name || !surname || !description || !email || !password);
};

export const hasMissingParamsForLogin = ({ email, password }: UserType): boolean => {
    return (!email || !password);
}
