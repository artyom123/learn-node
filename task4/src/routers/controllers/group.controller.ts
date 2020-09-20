import { Request, Response, NextFunction } from 'express';

import { GroupModel } from '../../models/group.model';
import { UserModel } from '../../models/user.model';
import { UsersGroupsModel } from '../../models/users_groups.model';
import { DEFAULT_GROUPS } from '../../data/data-users';
import GroupServices from '../../services/group.services';
import { ErrorHandler } from '../../helpers/error';

import UserServices from '../../services/user.services';

class GroupController {
    constructor() {
        GroupModel
            .sync({ force: true })
            .then(() => GroupModel.bulkCreate(DEFAULT_GROUPS))
            .catch(function () {
                console.log("Error: reject add");
            });
    }

    async findById (req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
    
        try {
            const group = await GroupServices.findById(id);

            if (!group) {
                throw new ErrorHandler(404, 'Group doesn\'t exists');
            } else {
                const optionsUserId = {
                    where: { groupId: id },
                    attributes: ['userId'],
                };
            
                const usersIds = (await UsersGroupsModel.findAll(optionsUserId))
                    .map((userId) => userId.getDataValue('userId'));

                const optionsUser = {
                    where: { id: usersIds },
                };

                const users = (await UserModel.findAll(optionsUser))
                    .map(user => user.get());

                res.status(200).json({ ...group.get(), users });
            }
        } catch (error) {
            next(new ErrorHandler(500, 'Error: find group'));
        }
    }

    async findAll (req: Request, res: Response, next: NextFunction) {
        try {
            const groups = await GroupServices.findAll();

            res.status(200).json({ groups });
        } catch (error) {
            next(new ErrorHandler(500, 'Error: find groups'));
        }
    }
    
    async updateById (req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        
        try {
            await GroupServices.updateById(req.body, id);

            res.status(200).json({ success: `Group ${id} updated` });
        } catch (error) {
            next(new ErrorHandler(500, 'Error: update group'));
        }
    }
    
    async create (req: Request, res: Response, next: NextFunction) {
        try {
            const newGroup = await GroupServices.create(req.body);

            const groupId = newGroup.getDataValue('id');

            if (req.body.users) {
                await UserServices.addUsersToGroup(groupId, req.body.users);
            }

            res.status(200).json(newGroup);
        } catch (error) {
            next(new ErrorHandler(500, 'Error: create group'));
        }
    }
    
    async remove (req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        try {
            await GroupServices.remove(id);

            res.status(200).json({ success: `Group ${id} deleted` });
        } catch (error) {
            next(new ErrorHandler(500, 'Error: remove group'));
        }
    }
};

export default new GroupController();
