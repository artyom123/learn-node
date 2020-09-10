import { Model, DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

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
            timestamps: false,
            sequelize,
        }
    );
}
