"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedClient = void 0;
const discord_js_1 = require("discord.js");
class ExtendedClient extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.commands = new discord_js_1.Collection();
    }
}
exports.ExtendedClient = ExtendedClient;
