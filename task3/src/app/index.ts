import express, { Application, Router, Response, Request } from 'express';

import usersRouterInit from '../routers/index';
import GroupDatabase from '../data-access/index';
import config from '../config';

import { handleError } from '../helpers/error';


class App {
    app: Application;
    router: Router

    constructor() {
        this.app = express();
        this.router = Router();

        new GroupDatabase();

        usersRouterInit(this.router);

        this.config();
    }

    config() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use('/', this.router);
        this.app.use((err: any, req: Request, res: Response, next: any) => {
            handleError(err, res);
        });
    }

    start() {
        this.app.listen(config.PORT, () => console.log(`Start working ${config.PORT}`));
    }
}

export default new App();
