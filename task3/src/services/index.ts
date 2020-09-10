import { Op } from 'sequelize';

import  { UserModel } from '../models/user.model';

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
};

export default new UserServices();
