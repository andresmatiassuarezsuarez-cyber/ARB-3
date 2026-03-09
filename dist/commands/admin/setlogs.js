"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const logsConfig_1 = __importDefault(require("../../models/logsConfig"));
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("setlogs")
        .setDescription("Configura el canal donde se enviarán los logs del bot")
        .addChannelOption(opt => opt.setName("canal")
        .setDescription("Canal donde se enviarán los logs")
        .setRequired(true))
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel("canal");
        await logsConfig_1.default.findOneAndUpdate({ guildId: interaction.guild.id }, { channelId: channel.id }, { upsert: true });
        interaction.reply({
            content: `📡 Canal de logs configurado correctamente: ${channel}`,
            ephemeral: true
        });
    }
};
