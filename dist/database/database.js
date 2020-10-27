"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.Bans = exports.db = void 0;
const sequelize_1 = require("sequelize");
const BansFactory_1 = __importDefault(require("./models/BansFactory"));
const ConfigFactory_1 = __importDefault(require("./models/ConfigFactory"));
exports.db = new sequelize_1.Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: './data/database.sqlite',
    transactionType: sequelize_1.Transaction.TYPES.IMMEDIATE,
    retry: {
        max: 10,
    }
});
exports.Bans = BansFactory_1.default(exports.db);
exports.Config = ConfigFactory_1.default(exports.db);
if (process.argv.includes('--dbInit')) {
    exports.db.sync({ force: true }).catch(console.error);
}
else {
    exports.db.sync().catch(console.error);
    exports.db.authenticate().catch(console.error);
}
