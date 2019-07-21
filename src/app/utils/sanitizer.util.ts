import { Request } from 'express';

export const sanitizeBody = (req: Request): any => {
    return Object.assign({},
        Object.values(req.body).map((value: any): string => {
            return (req as any).sanitize(value);
        })
    );
};