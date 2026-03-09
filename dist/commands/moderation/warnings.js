"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const sendLog_1 = require("../../utils/sendLog");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("warnings")
        .setDescription("Muestra las advertencias de un usuario")
        .addUserOption(opt => opt.setName("usuario")
        .setDescription("Usuario a consultar")
        .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser("usuario");
        const replyEmbed = new discord_js_1.EmbedBuilder()
            .setTitle("📋 Advertencias del usuario")
            .setColor("#95a5a6")
            .addFields({ name: "👤 Usuario", value: `${user.tag}` }, { name: "⚠️ Advertencias", value: "Sistema de advertencias aún no implementado" }, { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` });
        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
        const logEmbed = new discord_js_1.EmbedBuilder()
            .setTitle("📕 LOG — Consulta de advertencias")
            .setColor("#95a5a6")
            .addFields({ name: "👤 Usuario consultado", value: `${user.tag}` }, { name: "🛡️ Moderador", value: `${interaction.user.tag}` }, { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` });
        await (0, sendLog_1.sendLog)(interaction.guild, logEmbed);
    }
};
