"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const sendLog_1 = require("../../utils/sendLog");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("ban")
        .setDescription("Banea a un usuario del servidor")
        .addUserOption(opt => opt.setName("usuario")
        .setDescription("Usuario a banear")
        .setRequired(true))
        .addStringOption(opt => opt.setName("razon")
        .setDescription("Razón del baneo")
        .setRequired(false))
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        const user = interaction.options.getUser("usuario");
        const reason = interaction.options.getString("razon") || "Sin razón especificada";
        const member = interaction.guild.members.cache.get(user.id);
        if (!member) {
            return interaction.reply({ content: "❌ No puedo encontrar a ese usuario.", ephemeral: true });
        }
        await member.ban({ reason });
        // Embed para el moderador
        const replyEmbed = new discord_js_1.EmbedBuilder()
            .setTitle("🔨 Usuario baneado")
            .setColor("#ff0000")
            .addFields({ name: "👤 Usuario", value: `${user.tag}`, inline: true }, { name: "🛡️ Moderador", value: `${interaction.user.tag}`, inline: true }, { name: "📄 Razón", value: reason }, { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` })
            .setThumbnail(user.displayAvatarURL());
        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
        // Embed para logs
        const logEmbed = new discord_js_1.EmbedBuilder()
            .setTitle("📕 LOG — Usuario baneado")
            .setColor("#ff0000")
            .addFields({ name: "👤 Usuario", value: `${user.tag}` }, { name: "🛡️ Moderador", value: `${interaction.user.tag}` }, { name: "📄 Razón", value: reason }, { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` })
            .setThumbnail(user.displayAvatarURL());
        await (0, sendLog_1.sendLog)(interaction.guild, logEmbed);
    }
};
