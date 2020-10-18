import { Op } from 'sequelize';

import  { UserModel } from '../models/user.model';
import database from '../data-access/database';
import { UsersGroupsModel } from '../models/users_groups.model';

class UserServices {
    constructor() {}

    findById (id: string) {
        return UserModel.findByPk(id);
    }

    findAll (limit: number, loginSubstring: string) {
        return UserModel.findAll({
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
    }
    
    updateById (req: any, id: string) {   
        return UserModel.update(req, {
            where: { id },
        });
    }
    
    create (options: any) {
        return UserModel.create(options);
    }
    
    remove (id: string) {
        return UserModel.destroy({
            where: { id },
            limit: 1
        });
    }

    findOne ({ login, password }: any) {
        return UserModel.findOne({ where: { login } })
            .then((user) => {
                if (!user) {
                    return null;
                }

                if (user?.password !== password) {
                    return null;
                }

                return user;
            });
    }

    async addUsersToGroup (groupId: string, userIds: any) {
        const { db } = database;
        const transaction = await db.transaction();

        try {
            await UsersGroupsModel.bulkCreate(
                userIds.map((userId: any) => ({ groupId, userId })),
                { transaction },
            );

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();

            console.log('Transaction error');
        }
    }
};

export default new UserServices();
