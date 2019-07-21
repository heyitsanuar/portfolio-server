import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { AppRoutes } from '@app/app.routes';
//@ts-ignore
import expressSanitizer from 'express-sanitizer';

export const AppController = express();

AppController.use(expressSanitizer());
AppController.use(bodyParser.json());
AppController.use(bodyParser.urlencoded({ extended: true }));

// Setting CORS and HEADERS permits
AppController.use((req: Request, res: Response, next): void => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Cookies, Accept, Access-Control-Allow-Request-Method',
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PATCH, DELETE');
    next();
});

AppController.use('/api', AppRoutes);

// Handling 404 requests
AppController.use((req: Request, res: Response): void => {
    res.send({ message: 'Endpoint not found.' });
});
