"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../structures/Command"));
const database_1 = require("../database/database");
class Toggler extends Command_1.default {
    constructor(client) {
        super(client, {
            name: 'toggle',
            description: `Determine the bot's ping/latency to discord`,
            clientPermission: [],
            cooldown: 3,
            args: false,
            usage: 'toggle',
            aliases: [],
        });
    }
    async exec(message, args) {
        if (!message.member.permissions.has('MANAGE_GUILD'))
            return;
        return message.channel.send(`Confessions is now \`${await database_1.Config.toggle() ? 'enabled' : 'disabled'}\``);
    }
}
exports.default = Toggler;
