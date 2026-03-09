"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const sendLog_1 = require("../../utils/sendLog");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("clear")
        .setDescription("Elimina mensajes del canal")
        .addIntegerOption(opt => opt.setName("cantidad")
        .setDescription("Número de mensajes a borrar (1-100)")
        .setRequired(true))
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        const amount = interaction.options.getInteger("cantidad");
        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: "❌ Debes elegir entre 1 y 100 mensajes.", ephemeral: true });
        }
        await interaction.channel.bulkDelete(amount, true);
        const replyEmbed = new discord_js_1.EmbedBuilder()
            .setTitle("🧹 Mensajes eliminados")
            .setColor("#3498db")
            .addFields({ name: "🧮 Cantidad", value: `${amount}`, inline: true }, { name: "🛡️ Moderador", value: `${interaction.user.tag}`, inline: true }, { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` });
        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
        const logEmbed = new discord_js_1.EmbedBuilder()
            .setTitle("📕 LOG — Mensajes eliminados")
            .setColor("#3498db")
            .addFields({ name: "🧮 Cantidad", value: `${amount}` }, { name: "🛡️ Moderador", value: `${interaction.user.tag}` }, { name: "📍 Canal", value: `${interaction.channel}` }, { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` });
        await (0, sendLog_1.sendLog)(interaction.guild, logEmbed);
    }
};
