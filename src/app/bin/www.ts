require('dotenv').config();

import 'module-alias/register';
import mongoose from 'mongoose';

import { DB_CONNECT_STRING } from '@config/database.config';
import { PORT } from '@config/server.config';

import { AppController } from '@app/app.controller';

const connectToDatabase = async (): Promise<any> => {
    try {
        await mongoose.connect(DB_CONNECT_STRING, { useNewUrlParser: true });
        AppController.listen(PORT, (): void => console.log('Server running on port ' + PORT));
    } catch (error) {
        console.log(error);
    }
};

connectToDatabase();
