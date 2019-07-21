import { Response } from 'express';

export interface ResponseInterface extends Response {
    data?: any;
    message?: string;
}
