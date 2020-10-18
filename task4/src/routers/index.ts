import { Router } from 'express';

import userController from './controllers/user.controller';
import groupController from './controllers/group.controller';
import {
    idScheme,
    infoSchema,
    userSchema,
    groupSchema,
    authSchema,
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

class GroupsRouter {
    init(router: Router) {
        router.route('/groups')
            .post(middleware(groupSchema, 'body'), groupController.create)
            .get(groupController.findAll);

        router.route('/groups/:id')
            .get(groupController.findById)
            .put(middleware(idScheme, 'params'), middleware(groupSchema, 'body'), groupController.updateById)
            .delete(groupController.remove);
    }
};

class LoginRouter {
    init(router: Router) {
        router.route('/login')
            .post(middleware(authSchema, 'body'), userController.login);
    }
};

export default {
    usersRouter: new UsersRouter().init,
    groupsRouter: new GroupsRouter().init,
    authRouter: new LoginRouter().init,
};
