"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function BansFactory(sequelize) {
    class Bans extends sequelize_1.Model {
        static async ban(id) {
            const user = await Bans.findOne({ where: { id } });
            if (user)
                return false;
            await Bans.create({ id });
            return true;
        }
        static async unban(id) {
            const user = await Bans.findOne({ where: { id } });
            if (!user)
                return false;
            await Bans.destroy({ where: { id } });
            return true;
        }
        static async info(id) {
            const user = await Bans.findOne({ where: { id } });
            return user ? true : false;
        }
    }
    Bans.init({
        id: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            primaryKey: true,
        },
    }, {
        sequelize,
        tableName: 'bans',
    });
    return Bans;
}
exports.default = BansFactory;
