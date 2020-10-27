import { Sequelize, Transaction } from 'sequelize';
import BansFactory from './models/BansFactory';
import ConfigFactory from './models/ConfigFactory';

export const db = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: './data/database.sqlite',
    transactionType: Transaction.TYPES.IMMEDIATE,
    retry: {
        max: 10,
    }
});

export const Bans = BansFactory(db);
export const Config = ConfigFactory(db);

if (process.argv.includes('--dbInit')) {
    db.sync({ force: true }).catch(console.error);
} else {
    db.sync().catch(console.error);
    db.authenticate().catch(console.error);
}