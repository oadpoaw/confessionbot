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
            name: 'setprefix',
            description: `Determine the bot's ping/latency to discord`,
            clientPermission: [],
            cooldown: 3,
            args: true,
            usage: 'setprefix <prefix>',
            aliases: [],
        });
    }
    async exec(message, args) {
        if (!message.member.permissions.has('MANAGE_GUILD'))
            return;
        const prefix = args.shift();
        if (prefix.length > 5)
            return message.channel.send(`You cannot set the prefix with a length of 6 and beyond`);
        database_1.Config.setPrefix(prefix);
    }
}
exports.default = SetCMd;
