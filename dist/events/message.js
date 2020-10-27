"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../structures/Event"));
const discord_js_1 = require("discord.js");
const Utils_1 = __importDefault(require("../utils/Utils"));
const Random_1 = __importDefault(require("../utils/Random"));
const database_1 = require("../database/database");
const Cooldowns = new discord_js_1.Collection();
const ConfessionCooldowns = new discord_js_1.Collection();
class MessageEvent extends Event_1.default {
    constructor(client) {
        super(client, 'message');
    }
    async exec(message) {
        if (message.author.bot)
            return;
        if (message.channel.type === 'dm') {
            let allowConfession = true;
            const config = await database_1.Config.getConfig();
            if (message.content.startsWith('?confess ')) {
                const confession = message.content.slice(9).split(/ +/g).join(' ');
                if (!confession)
                    allowConfession = false;
                if (allowConfession && !config.enabled)
                    allowConfession = false;
                if (allowConfession && (await database_1.Bans.info(message.author.id)))
                    allowConfession = false;
                if (allowConfession && ConfessionCooldowns.has(message.author.id))
                    allowConfession = false;
                if (allowConfession) {
                    ConfessionCooldowns.set(message.author.id, true);
                    this.client.setTimeout(() => ConfessionCooldowns.delete(message.author.id), 60000);
                }
            }
            else
                allowConfession = false;
            if (allowConfession) {
                const confession = message.content.slice(9).split(/ +/g).join(' ');
                const count = await database_1.Config.getCount();
                const id1 = config.confessionChannel;
                const id2 = config.logChannel;
                const embed = new discord_js_1.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`Confession #${count}`)
                    .setDescription(confession)
                    .setURL('https://oadpoaw.xyz/')
                    .setTimestamp();
                const confessionChannel = await this.client.channels.fetch(id1);
                const logChannel = await this.client.channels.fetch(id2);
                if (confessionChannel)
                    await confessionChannel.send(embed);
                embed.setAuthor(`${message.author.tag} / ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));
                if (logChannel)
                    await logChannel.send(embed);
                await message.channel.send(`Your confession has been sent! <#${confessionChannel.id}>`);
            }
        }
        ;
        if (message.channel.type !== 'text')
            return;
        if (!message.channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES']))
            return;
        if (!message.member)
            await message.member.fetch().catch(() => { });
        const prefixRegex = new RegExp(`^(<@!?${this.client.user.id}>|${Utils_1.default.escapeRegex(await database_1.Config.getPrefix())})\\s*`);
        if (!prefixRegex.test(message.content))
            return;
        const [, matchedPrefix] = message.content.match(prefixRegex);
        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = this.client.resolveCommand(commandName);
        if (!command)
            return;
        if (!Cooldowns.has(command.config.name))
            Cooldowns.set(command.config.name, new discord_js_1.Collection());
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
        if (command.config.clientPermission && (!message.guild.me.permissions.has(command.config.clientPermission) || !message.channel.permissionsFor(message.guild.me).has(command.config.clientPermission)))
            return message.channel.send(`Sorry, but i need the following permisions to perform this command\n\`\`\`html\n<${command.config.clientPermission.join('> <')}>\n\`\`\``);
        if (command.config.args && !args.length && command.config.usage)
            return message.channel.send(`Sorry, You didn't provide any arguments, ${message.author}!\nThe proper usage would be:\n\`\`\`html\n${command.config.usage}\n\`\`\``);
        try {
            this.client.logger.info(`[${message.guild.name} ${message.guild.id}] (${message.author.tag} ${message.author.id}) ${command.config.name} ${args.join(' ')}`);
            const stat = await command.exec(message, args);
            if (stat !== false) {
                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            }
        }
        catch (e) {
            const errorID = Random_1.default.string(8);
            this.client.logger.error(`Error executing command ${command.config.name} [${errorID}]\n`, e);
            message.channel.send(new discord_js_1.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setAuthor(`Error executing command ${command.config.name}`)
                .setDescription(`Error ID: \`${errorID}\`\n\n\`\`\`xl\n${Utils_1.default.shorten(e.stack ? e.stack : '', 256)}`));
        }
    }
}
exports.default = MessageEvent;
