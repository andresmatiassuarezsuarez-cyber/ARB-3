import { EmbedBuilder } from "discord.js";
import LogsConfig from "../models/logsConfig";

export async function sendLog(guild: any, embed: any) {
    const config = await LogsConfig.findOne({ guildId: guild.id });
    if (!config) return;

    const channel = guild.channels.cache.get(config.channelId);
    if (!channel) return;

    channel.send({ embeds: [embed] });
}
