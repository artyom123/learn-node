import { Sequelize } from 'sequelize';

import config from '../config/index';
import { UserToMany, GroupToMany } from '../models/index';
import { initUserModel } from '../models/user.model';
import { initGroupModel } from '../models/group.model';
import { initUsersGroupsModel } from '../models/users_groups.model';


class Database {
    db: Sequelize;

    constructor() {
        this.db = new Sequelize(
            config.DB.database,
            config.DB.username,
            config.DB.password, {
                host: config.DB.host,
                dialect: config.DB.dialect
            }
        );
        
        initUsersGroupsModel(this.db);
        initUserModel(this.db);
        initGroupModel(this.db);

        UserToMany();
        GroupToMany();

        this.connect();
    }

    async connect() {
        this.db.authenticate()
            .then(() => {
            console.log('Connection has been established successfully.');
            })
            .catch(err => {
            console.error('Unable to connect to the database:', err);
            });
    }
}

export default new Database();
