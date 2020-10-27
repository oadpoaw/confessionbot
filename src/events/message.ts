import Event from '../structures/Event';
import Bot from '../Bot';
import { Message, MessageEmbed, Collection, TextChannel } from 'discord.js';
import Utils from '../utils/Utils';
import Random from '../utils/Random';
import { Config, Bans } from '../database/database';

const Cooldowns = new Collection<string, Collection<string, number>>();
const ConfessionCooldowns = new Collection<string, any>();

export default class MessageEvent extends Event {
    constructor(client: Bot) {
        super(client, 'message');
    }
    public async exec(message: Message) {
        if (message.author.bot) return;
        if (message.channel.type !== 'text' || !message.guild) {
            let allowConfession = true;
            const config = await Config.getConfig();
            if (message.content.startsWith('?confess')) {
                const confession = message.content.slice(8);
                if (!confession) allowConfession = false;
                if (allowConfession && !config.enabled) allowConfession = false;
                if (allowConfession && await Bans.info(message.author.id)) allowConfession = false;
                if (allowConfession && ConfessionCooldowns.has(message.author.id)) allowConfession = false;
                if (allowConfession) {
                    ConfessionCooldowns.set(message.author.id, true);
                    this.client.setTimeout(() => ConfessionCooldowns.delete(message.author.id), 60000);
                }
            } else allowConfession = false;
            if (allowConfession) {
                const confession = message.content.slice(8);
                const count = await Config.getCount();
                const id1 = config.confessionChannel;
                const id2 = config.logChannel;
                const embed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`Confession #${count}`)
                    .setDescription(confession)
                    .setURL('https://oadpoaw.xyz/')
                    .setTimestamp()
                const confessionChannel = this.client.channels.cache.get(id1) as TextChannel;
                const logChannel = this.client.channels.cache.get(id2) as TextChannel;
                if (confessionChannel) await confessionChannel.send(embed);
                embed.setAuthor(`${message.author.tag} / ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));
                if (logChannel) await logChannel.send(embed);
            }
            return;
        };
        if (!message.channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES'])) return;
        if (!message.member) await message.member.fetch().catch(() => { });
        const prefixRegex = new RegExp(`^(<@!?${this.client.user.id}>|${Utils.escapeRegex(await Config.getPrefix())})\\s*`);
        if (!prefixRegex.test(message.content)) return;
        const [, matchedPrefix] = message.content.match(prefixRegex);
        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = this.client.resolveCommand(commandName);
        if (!command) return;
        if (!Cooldowns.has(command.config.name)) Cooldowns.set(command.config.name, new Collection());
        const now = Date.now();
        const timestamps = Cooldowns.get(command.config.name);
        const cooldownAmount = (command.config.cooldown || 3) * 1000;
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait **${timeLeft.toFixed(1)}** more second(s) before reusing the \`${command.config.name}\` command.`);
            }
        }
        if (command.config.clientPermission && (!message.guild.me.permissions.has(command.config.clientPermission) || !message.channel.permissionsFor(message.guild.me).has(command.config.clientPermission))) return message.channel.send(`Sorry, but i need the following permisions to perform this command\n\`\`\`html\n<${command.config.clientPermission.join('> <')}>\n\`\`\``);
        if (command.config.args && !args.length && command.config.usage) return message.channel.send(`Sorry, You didn't provide any arguments, ${message.author}!\nThe proper usage would be:\n\`\`\`html\n${command.config.usage}\n\`\`\``)
        try {
            this.client.logger.info(`[${message.guild.name} ${message.guild.id}] (${message.author.tag} ${message.author.id}) ${command.config.name} ${args.join(' ')}`);
            const stat: any = await command.exec(message, args);
            if (stat !== false) {
                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            }
        } catch (e) {
            const errorID = Random.string(8);
            this.client.logger.error(`Error executing command ${command.config.name} [${errorID}]\n`, e);
            message.channel.send(new MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setAuthor(`Error executing command ${command.config.name}`)
                .setDescription(`Error ID: \`${errorID}\`\n\n\`\`\`xl\n${Utils.shorten(e.stack ? e.stack : '', 256)}`)
            );
        }
    }
}
