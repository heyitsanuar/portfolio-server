import express, { Request, Response } from 'express';
import { sanitizeBody } from '../app/utils/sanitize.util';

export const UserRoutes = express.Router();

UserRoutes.patch('/users/:id', async (req, res): Promise<Response> => {
    const productId = (req as any).sanitize(req.params.id);
    const product = sanitizeBody(req);

    try {

    } catch ({ code, message }) {
        return res.status(code).send({ message });
    }
});

UserRoutes.delete('/users/:id', async (req, res) => {
    const productId = (req as any).sanitize(req.params.id);

    try {

    } catch ({ code, message }) {
        return res.status(code).send({ message });
    }
});


UserRoutes.post(
    '/users/login',
    async (req: Request, res: Response): Promise<Response> => {
        try {

        } catch ({ code, message }) {
            return res.status(code).send({ message });
        }
    },
);

UserRoutes.post(
    '/users/register', async (req: Request, res: Response): Promise<Response> => {
        const product: any = sanitizeBody(req);

        try {
        } catch ({ code, message }) {
            return res.status(code).send({ message });
        }
    },
);