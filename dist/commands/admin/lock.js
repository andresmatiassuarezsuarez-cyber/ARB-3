"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const sendLog_1 = require("../../utils/sendLog");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("lock")
        .setDescription("Bloquea el canal actual")
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.ManageChannels),
    async execute(interaction) {
        const channel = interaction.channel;
        await channel.permissionOverwrites.edit(interaction.guild.id, {
            SendMessages: false
        });
        const replyEmbed = new discord_js_1.EmbedBuilder()
            .setTitle("🔒 Canal bloqueado")
            .setColor("#9b59b6")
            .addFields({ name: "📍 Canal", value: `${channel}` }, { name: "🛡️ Moderador", value: `${interaction.user.tag}` }, { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` });
        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
        const logEmbed = new discord_js_1.EmbedBuilder()
            .setTitle("📕 LOG — Canal bloqueado")
            .setColor("#9b59b6")
            .addFields({ name: "📍 Canal", value: `${channel}` }, { name: "🛡️ Moderador", value: `${interaction.user.tag}` }, { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` });
        await (0, sendLog_1.sendLog)(interaction.guild, logEmbed);
    }
};
