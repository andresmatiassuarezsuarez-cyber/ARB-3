"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const sendLog_1 = require("../../utils/sendLog");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("unwarn")
        .setDescription("Elimina una advertencia de un usuario")
        .addUserOption(opt => opt.setName("usuario")
        .setDescription("Usuario al que quitar la advertencia")
        .setRequired(true))
        .addStringOption(opt => opt.setName("razon")
        .setDescription("Razón para eliminar la advertencia")
        .setRequired(false))
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.ModerateMembers),
    async execute(interaction) {
        const user = interaction.options.getUser("usuario");
        const reason = interaction.options.getString("razon") || "Sin razón especificada";
        const replyEmbed = new discord_js_1.EmbedBuilder()
            .setTitle("⚠️ Advertencia eliminada")
            .setColor("#f39c12")
            .addFields({ name: "👤 Usuario", value: `${user.tag}`, inline: true }, { name: "🛡️ Moderador", value: `${interaction.user.tag}`, inline: true }, { name: "📄 Razón", value: reason }, { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` })
            .setThumbnail(user.displayAvatarURL());
        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
        const logEmbed = new discord_js_1.EmbedBuilder()
            .setTitle("📕 LOG — Advertencia eliminada")
            .setColor("#f39c12")
            .addFields({ name: "👤 Usuario", value: `${user.tag}` }, { name: "🛡️ Moderador", value: `${interaction.user.tag}` }, { name: "📄 Razón", value: reason }, { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` })
            .setThumbnail(user.displayAvatarURL());
        await (0, sendLog_1.sendLog)(interaction.guild, logEmbed);
    }
};
