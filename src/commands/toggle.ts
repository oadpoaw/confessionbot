import Command from '../structures/Command';
import Bot from '../Bot';
import { Message } from 'discord.js';
import { Config } from '../database/database';

export default class Toggler extends Command {
    public constructor(client: Bot) {
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
    public async exec(message: Message, args: string[]) {
        if (!message.member.permissions.has('MANAGE_GUILD')) return;
        return message.channel.send(`Confessions is now \`${await Config.toggle() ? 'enabled' : 'disabled'}\``)
    }
}