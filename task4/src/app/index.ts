import express, { Application, Router, Response, Request } from 'express';
import cors from 'cors';

import RouterInit from '../routers/index';
import GroupDatabase from '../data-access/index';
import config from '../config';
import { logger } from '../helpers/logger';

import { handleError } from '../helpers/error';

import middleware from '../validation/middleware';

class App {
    app: Application;
    router: Router;
    server: any;

    constructor() {
        this.app = express();
        this.router = Router();

        new GroupDatabase();

        RouterInit.usersRouter(this.router);
        RouterInit.groupsRouter(this.router);
        RouterInit.authRouter(this.router);

        this.config();
    }

    config() {
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use('/users*', middleware());
        this.app.use('/groups*', middleware());
        this.app.use('/', (req: Request, res: Response, next: any) => {
            const { path, method, body } = req;

            logger.info({ method, path, body });

            next();
        }, this.router);
        this.app.use((err: any, req: Request, res: Response, next: any) => {
            const { path } = req;

            handleError(err, res, path);
        });

        process.on('uncaughtException', (error) => {
            logger.error({ info: `uncaughtException: ${JSON.stringify(error)}` });
            
            this.server.close(() => {
                console.log('Http server closed.');
            });

            process.exit(1);
        });

        process.on('unhandledRejection', () => {
            logger.error({ info: 'promise unhandled rejection' });
        });
    }

    start() {
        this.server = this.app.listen(config.PORT, () => console.log(`Start working ${config.PORT}`));
    }
}

export default new App();
