import { Request, Response } from 'express';
import { Op } from 'sequelize';

import UserModels from '../models/user.model';

import { DEFAULT_USERS } from '../data/data-users';

class UsersServices {
    constructor() {
        UserModels
            .sync({ force: true })
            .then(() => UserModels.bulkCreate(DEFAULT_USERS));
    }

    async findById (req: Request, res: Response) {
        const { id } = req.params;
    
        try {
            const user = await UserModels.findByPk(id);

            if (!user) {
                res.status(404).json({
                    error: 'User doesn\'t exists'
                });
            } else {
                res.status(200).json({ user });
            }
        } catch (error) {
            res.status(404).json({ error });
        }
    }

    async findAll (req: Request, res: Response) {
        const { limit, loginSubstring = '' }: any = req.query;

        try {
            const users = await UserModels.findAll({
                where: {
                    login: {
                        [Op.iRegexp]: loginSubstring
                    }
                },
                order: [
                    ['login', 'ASC'],
                ],
                limit,
            });

            res.status(200).json({ users });
        } catch (error) {
            res.status(404).json({ error });
        }
    }
    
    async updateById (req: Request, res: Response) {
        const { id } = req.params;
        
        try {
            await UserModels.update(req.body, {
                where: { id },
            });

            res.status(200).json({ success: `User ${id} updated` });
        } catch (error) {
            res.status(404).json({ error });
        }
    }
    
    async create (req: Request, res: Response) {
        try {
            const newUser = await UserModels.create(req.body);

            res.status(200).json(newUser);
        } catch (error) {
            res.status(404).json({ error });
        }
    }
    
    async remove (req: Request, res: Response) {
        const { id } = req.params;

        try {
            await UserModels.update({
                isDeleted: true,
            }, {
                where: { id },
            });

            res.status(200).json({ success: `User ${id} deleted` });
        } catch (error) {
            res.status(404).json({ error });
        }
    }
};

export default new UsersServices();
