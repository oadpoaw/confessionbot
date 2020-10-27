import { DataTypes, Sequelize, Model } from 'sequelize';

export default function ConfigFactory(sequelize: Sequelize) {
    class Config extends Model {
        public id!: string;
        public prefix!: string;
        public logChannel!: string;
        public confessionChannel!: string;
        public count!: number;
        public enabled!: boolean;
        public static async getConfig() {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild) guild = await Config.create({ id: 'main' });
            return guild;
        }
        public static async enabled() {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild) guild = await Config.create({ id: 'main' });
            return guild.enabled;
        }
        public static async toggle() {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild) guild = await Config.create({ id: 'main' });
            guild.enabled = !guild.enabled;
            return guild.enabled;
        }
        public static async getCount() {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild) guild = await Config.create({ id: 'main' });
            guild.count++;
            await guild.save();
            return guild.count;
        }
        public static async getPrefix() {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild) guild = await Config.create({ id: 'main' });
            return guild.prefix;
        }
        public static async setPrefix(prefix: string) {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild) guild = await Config.create({ id: 'main' });
            guild.prefix = prefix;
            return guild.prefix;
        }
        public static async getlogChannel() {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild) guild = await Config.create({ id: 'main' });
            return guild.logChannel;
        }
        public static async setlogChannel(logChannel: string) {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild) guild = await Config.create({ id: 'main' });
            guild.logChannel = logChannel;
            return guild.logChannel;
        }
        public static async getconfessionChannel() {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild) guild = await Config.create({ id: 'main' });
            return guild.logChannel;
        }
        public static async setconfessionChannel(confessionChannel: string) {
            let guild = await Config.findOne({ where: { id: 'main' } });
            if (!guild) guild = await Config.create({ id: 'main' });
            guild.confessionChannel = confessionChannel;
            return guild.confessionChannel;
        }
    }
    Config.init({
        id: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true,
        },
        prefix: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '?',
        },
        logChannel: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        confessionChannel: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        count: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 0,
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }, {
        sequelize,
        tableName: 'config',
    });
    return Config;
}