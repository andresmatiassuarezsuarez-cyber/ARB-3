"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLog = sendLog;
const logsConfig_1 = __importDefault(require("../models/logsConfig"));
async function sendLog(guild, embed) {
    const config = await logsConfig_1.default.findOne({ guildId: guild.id });
    if (!config)
        return;
    const channel = guild.channels.cache.get(config.channelId);
    if (!channel)
        return;
    channel.send({ embeds: [embed] });
}
