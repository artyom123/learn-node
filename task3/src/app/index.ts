import express, { Application, Router } from 'express';

import usersRouterInit from '../routers/index';
import config from '../config';


class App {
    app: Application;
    router: Router

    constructor() {
        this.app = express();
        this.router = express.Router();

        usersRouterInit(this.router);

        this.config();
    }

    config() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use('/', this.router);
    }

    start() {
        this.app.listen(config.PORT, () => console.log(`Start working ${config.PORT}`));
    }
}

export default new App();
