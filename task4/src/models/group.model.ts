import { Model, DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { Permission } from '../types/group';
import { UserModel } from '../models/user.model';
import { UsersGroupsModel } from '../models/users_groups.model';

export class GroupModel extends Model {
    public id!: string;
    public name!: string;
    public permissions!: Permission[];
}

export const initGroupModel = (sequelize: Sequelize) => {
    GroupModel.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: () => uuidv4(),
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            permissions: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: [],
            },
        },
        {
            modelName: 'Groups',
            sequelize,
        }
    );
}

export function GroupToMany () {
    GroupModel.belongsToMany(UserModel, { through: UsersGroupsModel });
}
