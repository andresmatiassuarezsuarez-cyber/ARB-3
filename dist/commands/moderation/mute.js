"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const sendLog_1 = require("../../utils/sendLog");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("mute")
        .setDescription("Silencia a un usuario")
        .addUserOption(opt => opt.setName("usuario")
        .setDescription("Usuario a silenciar")
        .setRequired(true))
        .addIntegerOption(opt => opt.setName("minutos")
        .setDescription("Duración del mute")
        .setRequired(true))
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.ModerateMembers),
    async execute(interaction) {
        const user = interaction.options.getUser("usuario");
        const minutes = interaction.options.getInteger("minutos");
        const member = interaction.guild.members.cache.get(user.id);
        await member.timeout(minutes * 60 * 1000);
        const replyEmbed = new discord_js_1.EmbedBuilder()
            .setTitle("🔇 Usuario muteado")
            .setColor("#e67e22")
            .addFields({ name: "👤 Usuario", value: `${user.tag}`, inline: true }, { name: "🛡️ Moderador", value: `${interaction.user.tag}`, inline: true }, { name: "⏱️ Duración", value: `${minutes} minutos` }, { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` })
            .setThumbnail(user.displayAvatarURL());
        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
        const logEmbed = new discord_js_1.EmbedBuilder()
            .setTitle("📕 LOG — Usuario muteado")
            .setColor("#e67e22")
            .addFields({ name: "👤 Usuario", value: `${user.tag}` }, { name: "🛡️ Moderador", value: `${interaction.user.tag}` }, { name: "⏱️ Duración", value: `${minutes} minutos` }, { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` })
            .setThumbnail(user.displayAvatarURL());
        await (0, sendLog_1.sendLog)(interaction.guild, logEmbed);
    }
};
