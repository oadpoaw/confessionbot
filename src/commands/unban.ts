import Command from '../structures/Command';
import Bot from '../Bot';
import { Message } from 'discord.js';
import { Bans } from '../database/database';

export default class Unban extends Command {
    public constructor(client: Bot) {
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
    public async exec(message: Message, args: string[]) {
        if (!message.member.permissions.has('BAN_MEMBERS')) return;
        const user = await this.client.resolveUser(args.join(' '));
        if (!user || user.bot) return message.channel.send(`That's not a valid user`);
        if (user.equals(message.author)) return message.channel.send(`Hey! you can't do that`);
        await Bans.unban(user.id);
        return message.channel.send(`User can now confess his/her sins`);
    }
}