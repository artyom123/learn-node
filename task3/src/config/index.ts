import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname,'../../.env') });

export default {
    PORT: 3000,
    DB: {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
};
