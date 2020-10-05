import express, { Application, Router, Response, Request } from 'express';

import RouterInit from '../routers/index';
import GroupDatabase from '../data-access/index';
import config from '../config';
import { logger } from '../helpers/logger';

import { handleError } from '../helpers/error';

class App {
    app: Application;
    router: Router

    constructor() {
        this.app = express();
        this.router = Router();

        new GroupDatabase();

        RouterInit.usersRouter(this.router);
        RouterInit.groupsRouter(this.router);

        this.config();
    }

    config() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use('/', (req: Request, res: Response, next: any) => {
            const { path, method, params, query, body } = req;

            logger.info({ method, body });
            next();
        }, this.router);
        this.app.use((err: any, req: Request, res: Response, next: any) => {
            handleError(err, res);
        });

        process.on('uncaughtException', (error) => {
            logger.error({ info: 'uncaughtException' });
        });

        process.on('unhandledRejection', error => {
            logger.error({ info: 'promise unhandled rejection' });
        });
    }

    start() {
        this.app.listen(config.PORT, () => console.log(`Start working ${config.PORT}`));
    }
}

export default new App();
