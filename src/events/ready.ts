import Event from '../structures/Event';
import Bot from '../Bot';

export default class Ready extends Event {
    constructor(client: Bot) {
        super(client, 'ready');
    }
    async exec() {
        this.client.logger.info(`Bot ready as ${this.client.user.tag} (${this.client.user.id})`);
    }
}