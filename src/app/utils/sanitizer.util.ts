import { Request } from 'express';

export const sanitizeBody = (req: Request): any => Object.assign(
  {},
  ...Object.keys(req.body).map((key: any): any => ({ [key]: (req as any).sanitize(req.body[key]) })),
);
