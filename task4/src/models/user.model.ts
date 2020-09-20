import { Model, DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { GroupModel } from '../models/group.model';
import { UsersGroupsModel } from '../models/users_groups.model';

export class UserModel extends Model {
    public id!: string;
    public login!: string;
    public password!: string;
    public age!: number;
}

export const initUserModel = (sequelize: Sequelize) => {
    UserModel.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: () => uuidv4(),
            },
            login: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            modelName: 'Users',
            sequelize,
        }
    );
}

export function UserToMany () {
    UserModel.belongsToMany(GroupModel, { through: UsersGroupsModel });
}
