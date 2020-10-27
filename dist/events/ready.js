"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../structures/Event"));
class Ready extends Event_1.default {
    constructor(client) {
        super(client, 'ready');
    }
    async exec() {
        this.client.logger.info(`Bot ready as ${this.client.user.tag} (${this.client.user.id})`);
    }
}
exports.default = Ready;
