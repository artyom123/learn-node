import { Request, Response, NextFunction } from 'express';

import UserServices from '../../services/index';

import { UserModel } from '../../models/user.model';
import { DEFAULT_USERS } from '../../data/data-users';
import { ErrorHandler } from '../../helpers/error';

class UserController {
    constructor() {
        UserModel
            .sync({ force: true })
            .then(() => UserModel.bulkCreate(DEFAULT_USERS));
    }

    async findById (req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
    
        try {
            const user = await UserServices.findById(id);

            if (!user) {
                throw new ErrorHandler(404, 'User doesn\'t exists');
            } else {
                res.status(200).json({ user });
            }
        } catch (error) {
            next(new ErrorHandler(500, 'Error: find user'));
        }
    }

    async findAll (req: Request, res: Response, next: NextFunction) {
        const { limit, loginSubstring = '' }: any = req.query;

        try {
            const users = await UserServices.findAll(limit, loginSubstring);

            res.status(200).json({ users });
        } catch (error) {
            next(new ErrorHandler(500, 'Error: find users'));
        }
    }
    
    async updateById (req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        
        try {
            await UserServices.updateById(req.body, id);

            res.status(200).json({ success: `User ${id} updated` });
        } catch (error) {
            next(new ErrorHandler(500, 'Error: update user'));
        }
    }
    
    async create (req: Request, res: Response, next: NextFunction) {
        try {
            const newUser = await UserServices.create(req.body);

            res.status(200).json(newUser);
        } catch (error) {
            next(new ErrorHandler(500, 'Error: create user'));
        }
    }
    
    async remove (req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        try {
            await UserServices.remove(id);

            res.status(200).json({ success: `User ${id} deleted` });
        } catch (error) {
            next(new ErrorHandler(500, 'Error: remove user'));
        }
    }
};

export default new UserController();
