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
        const name = args.shift();
        if (!name || !['logChannel', 'confessionChannel'].includes(name)) return message.channel.send(`That's an invalid option, use \`set <logChannel|confessionChannel> <#Channel>\``);
        if (!message.mentions.channels.first()) return message.channel.send(`Hey! you didn't mention a text channel :P`);
        if (message.mentions.channels.first().type !== 'text') return message.channel.send(`That is not a text channel`);
        const channel = message.mentions.channels.first();
        if (name === 'logChannel') await Config.setlogChannel(channel.id);
        if (name === 'confessionChannel') await Config.setconfessionChannel(channel.id);
        message.channel.send(`\`${name}\` has been set to ${channel}`);
    }
}