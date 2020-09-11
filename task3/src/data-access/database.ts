import { Sequelize } from 'sequelize';

import config from '../config/index';
import { initUserModel } from '../models/user.model';


export default class Database {
    db: Sequelize;

    constructor() {
        this.db = new Sequelize(
            config.DB.database,
            config.DB.username,
            config.DB.password, {
                host: config.DB.host,
                dialect: config.DB.dialect
            });
        
        initUserModel(this.db);

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
