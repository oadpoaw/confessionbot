import Command from '../structures/Command';
import Bot from '../Bot';
import { Message } from 'discord.js';
import { Config } from '../database/database';

export default class SetCMd extends Command {
    public constructor(client: Bot) {
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
    public async exec(message: Message, args: string[]) {
        if (!message.member.permissions.has('MANAGE_GUILD')) return;
        const prefix = args.shift();
        if (prefix.length > 5) return message.channel.send(`You cannot set the prefix with a length of 6 and beyond`);
        Config.setPrefix(prefix);
    }
}