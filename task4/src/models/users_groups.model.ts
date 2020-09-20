import { Model, DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export class UsersGroupsModel extends Model {
    public id!: string;
    public groupId!: string;
    public userId!: string;
}

export const initUsersGroupsModel = (sequelize: Sequelize) => {
    UsersGroupsModel.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: () => uuidv4(),
            },
            groupId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
        },
        {
            modelName: 'UsersGroups',
            sequelize,
        }
    );
}
