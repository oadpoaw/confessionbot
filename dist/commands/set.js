"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../structures/Command"));
const database_1 = require("../database/database");
class SetCMd extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'set',
            description: `Determine the bot's ping/latency to discord`,
            clientPermission: [],
            cooldown: 3,
            args: true,
            usage: 'set <logChannel|confessionChannel> <#Channel>',
            aliases: [],
        });
    }
    async exec(message, args) {
        if (!message.member.permissions.has('MANAGE_GUILD'))
            return;
        const name = args.shift();
        if (!name || !['logChannel', 'confessionChannel'].includes(name))
            return message.channel.send(`That's an invalid option, use \`set <logChannel|confessionChannel> <#Channel>\``);
        if (!message.mentions.channels.first())
            return message.channel.send(`Hey! you didn't mention a text channel :P`);
        if (message.mentions.channels.first().type !== 'text')
            return message.channel.send(`That is not a text channel`);
        const channel = message.mentions.channels.first();
        if (name === 'logChannel')
            await database_1.Config.setlogChannel(channel.id);
        if (name === 'confessionChannel')
            await database_1.Config.setconfessionChannel(channel.id);
        message.channel.send(`\`${name}\` has been set to ${channel}`);
    }
}
exports.default = SetCMd;
