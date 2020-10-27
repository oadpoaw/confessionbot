"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../structures/Command"));
const database_1 = require("../database/database");
class Unban extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'unban',
            description: ``,
            clientPermission: [],
            cooldown: 3,
            args: true,
            usage: 'unban <User>',
            aliases: [],
        });
    }
    async exec(message, args) {
        if (!message.member.permissions.has('BAN_MEMBERS'))
            return;
        const user = await this.client.resolveUser(args.join(' '));
        if (!user || user.bot)
            return message.channel.send(`That's not a valid user`);
        if (user.equals(message.author))
            return message.channel.send(`Hey! you can't do that`);
        await database_1.Bans.unban(user.id);
        return message.channel.send(`User can now confess his/her sins`);
    }
}
exports.default = Unban;
