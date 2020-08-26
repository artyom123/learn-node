import express from 'express';

import {
    create,
    findAll,
    findById,
    remove,
    updateById
} from './services/users';
import {
    idScheme,
    infoSchema,
    userSchema
} from './validation/index';
import middleware from './validation/middleware';

const port = 3000;

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.route('/users')
    .post(middleware(userSchema, 'body'), create)
    .get(findAll);

router.route('/users/:id')
    .get(findById)
    .put(middleware(idScheme, 'params'), middleware(infoSchema, 'body'), updateById)
    .delete(remove);

app.use('/', router);

app.listen(port, () => console.log(`Start working ${port}`));
