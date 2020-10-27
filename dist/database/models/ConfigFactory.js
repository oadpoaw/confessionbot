"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function ConfigFactory(sequelize) {
    class Config extends sequelize_1.Model {
        static async getConfig() {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild)
                guild = await Config.create({ id: 'main' });
            return guild;
        }
        static async enabled() {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild)
                guild = await Config.create({ id: 'main' });
            return guild.enabled;
        }
        static async toggle() {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild)
                guild = await Config.create({ id: 'main' });
            guild.enabled = !guild.enabled;
            await guild.save();
            return guild.enabled;
        }
        static async getCount() {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild)
                guild = await Config.create({ id: 'main' });
            guild.count++;
            await guild.save();
            return guild.count;
        }
        static async getPrefix() {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild)
                guild = await Config.create({ id: 'main' });
            return guild.prefix;
        }
        static async setPrefix(prefix) {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild)
                guild = await Config.create({ id: 'main' });
            guild.prefix = prefix;
            await guild.save();
            return guild.prefix;
        }
        static async getlogChannel() {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild)
                guild = await Config.create({ id: 'main' });
            return guild.logChannel;
        }
        static async setlogChannel(logChannel) {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild)
                guild = await Config.create({ id: 'main' });
            guild.logChannel = logChannel;
            await guild.save();
            return guild.logChannel;
        }
        static async getconfessionChannel() {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild)
                guild = await Config.create({ id: 'main' });
            return guild.logChannel;
        }
        static async setconfessionChannel(confessionChannel) {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild)
                guild = await Config.create({ id: 'main' });
            guild.confessionChannel = confessionChannel;
            await guild.save();
            return guild.confessionChannel;
        }
    }
    Config.init({
        id: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            primaryKey: true,
        },
        prefix: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: '?',
        },
        logChannel: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        confessionChannel: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        count: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 0,
        },
        enabled: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }, {
        sequelize,
        tableName: 'config',
    });
    return Config;
}
exports.default = ConfigFactory;
