import { DataTypes, Sequelize, Model } from 'sequelize';

export default function BansFactory(sequelize: Sequelize) {
    class Bans extends Model {
        public id!: string;
        public static async ban(id: string) {
            const user = await Bans.findOne({ where: { id } });
            if (user) return false;
            await Bans.create({ id });
            return true;
        }
        public static async unban(id: string) {
            const user = await Bans.findOne({ where: { id } });
            if (!user) return false;
            await Bans.destroy({ where: { id } });
            return true;
        }
        public static async info(id: string) {
            const user = await Bans.findOne({ where: { id }});
            return user ? true : false;
        }
    }
    Bans.init({
        id: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true,
        },
    }, {
        sequelize,
        tableName: 'bans',
    });
    return Bans;
}