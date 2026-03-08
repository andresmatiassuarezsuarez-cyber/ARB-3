import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { sendLog } from "../../utils/sendLog";

export default {
    data: new SlashCommandBuilder()
        .setName("unwarn")
        .setDescription("Elimina una advertencia de un usuario")
        .addUserOption(opt =>
            opt.setName("usuario")
               .setDescription("Usuario al que quitar la advertencia")
               .setRequired(true)
        )
        .addStringOption(opt =>
            opt.setName("razon")
               .setDescription("Razón para eliminar la advertencia")
               .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction: any) {
        const user = interaction.options.getUser("usuario");
        const reason = interaction.options.getString("razon") || "Sin razón especificada";

        const replyEmbed = new EmbedBuilder()
            .setTitle("⚠️ Advertencia eliminada")
            .setColor("#f39c12")
            .addFields(
                { name: "👤 Usuario", value: `${user.tag}`, inline: true },
                { name: "🛡️ Moderador", value: `${interaction.user.tag}`, inline: true },
                { name: "📄 Razón", value: reason },
                { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` }
            )
            .setThumbnail(user.displayAvatarURL());

        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

        const logEmbed = new EmbedBuilder()
            .setTitle("📕 LOG — Advertencia eliminada")
            .setColor("#f39c12")
            .addFields(
                { name: "👤 Usuario", value: `${user.tag}` },
                { name: "🛡️ Moderador", value: `${interaction.user.tag}` },
                { name: "📄 Razón", value: reason },
                { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` }
            )
            .setThumbnail(user.displayAvatarURL());

        await sendLog(interaction.guild, logEmbed);
    }
};
