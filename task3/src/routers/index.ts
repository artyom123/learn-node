import { Router } from 'express';

import userController from './controllers/user.controller';
import {
    idScheme,
    infoSchema,
    userSchema
} from '../validation/index';
import middleware from '../validation/middleware';

class UsersRouter {
    init(router: Router) {
        router.route('/users')
            .post(middleware(userSchema, 'body'), userController.create)
            .get(userController.findAll);

        router.route('/users/:id')
            .get(userController.findById)
            .put(middleware(idScheme, 'params'), middleware(infoSchema, 'body'), userController.updateById)
            .delete(userController.remove);
    }
};

export default new UsersRouter().init;
