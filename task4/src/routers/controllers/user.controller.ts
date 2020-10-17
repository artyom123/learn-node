import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import UserServices from '../../services/user.services';

import { UserModel } from '../../models/user.model';
import { GroupModel } from '../../models/group.model';
import { UsersGroupsModel } from '../../models/users_groups.model';
import { DEFAULT_USERS } from '../../data/data-users';
import { ErrorHandler } from '../../helpers/error';

import config from '../../config/';

class UserController {
    constructor() {
        UserModel
            .sync({ force: true })
            .then(() => UserModel.bulkCreate(DEFAULT_USERS))
            .catch(function () {
                console.log("Error: reject add");
            });
    }

    async findById (req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
    
        try {
            const user = await UserServices.findById(id);

            if (!user) {
                throw new ErrorHandler(404, 'User doesn\'t exists');
            } else {
                const optionsGroupId = {
                    where: { userId: id },
                    attributes: ['groupId'],
                };

                const groupsId = (await UsersGroupsModel.findAll(optionsGroupId))
                    .map((groupId) => groupId.getDataValue('groupId'));

                const optionsGroup = {
                    where: { id: groupsId },
                };

                const groups = (await GroupModel.findAll(optionsGroup))
                    .map(group => group.get());

                res.status(200).json({ ...user.get(), groups });
            }
        } catch (error) {
            next(new ErrorHandler(500, 'Error: find user', 'findById', { id }));
        }
    }

    async findAll (req: Request, res: Response, next: NextFunction) {
        const { limit, loginSubstring = '' }: any = req.query;

        try {
            const users = await UserServices.findAll(limit, loginSubstring);

            res.status(200).json({ users });
        } catch (error) {
            next(new ErrorHandler(500, 'Error: find users', 'findAll', { limit, loginSubstring }));
        }
    }
    
    async updateById (req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        
        try {
            await UserServices.updateById(req.body, id);

            res.status(200).json({ success: `User ${id} updated` });
        } catch (error) {
            next(new ErrorHandler(500, 'Error: update user', 'updateById', { id }));
        }
    }
    
    async create (req: Request, res: Response, next: NextFunction) {
        try {
            const newUser = await UserServices.create(req.body);

            res.status(200).json(newUser);
        } catch (error) {
            next(new ErrorHandler(500, 'Error: create user', 'create', req.body));
        }
    }
    
    async remove (req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        try {
            await UserServices.remove(id);

            res.status(200).json({ success: `User ${id} deleted` });
        } catch (error) {
            next(new ErrorHandler(500, 'Error: remove user', 'remove', { id }));
        }
    }

    async login (req: Request, res: Response, next: NextFunction) {
        const { login } = req.body;

        try {
            const user = await UserServices.findOne(req.body);

            if (!user) {
                throw new ErrorHandler(404, 'Incorrect login or password');
            }

            const payload = {
                userId: user.id,
            };

            const token = jwt.sign(payload, config.JWTSecret, { expiresIn: config.expiresInTime });

            res.status(200).json({ isActive: true, token });
        } catch (error) {
            next(new ErrorHandler(error.statusCode || 500,  error.info || error, 'login', { login }));
        }
    }
};

export default new UserController();
