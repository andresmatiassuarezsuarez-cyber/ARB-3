import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { sendLog } from "../../utils/sendLog";

export default {
    data: new SlashCommandBuilder()
        .setName("warnings")
        .setDescription("Muestra las advertencias de un usuario")
        .addUserOption(opt =>
            opt.setName("usuario")
               .setDescription("Usuario a consultar")
               .setRequired(true)
        ),

    async execute(interaction: any) {
        const user = interaction.options.getUser("usuario");

        const replyEmbed = new EmbedBuilder()
            .setTitle("📋 Advertencias del usuario")
            .setColor("#95a5a6")
            .addFields(
                { name: "👤 Usuario", value: `${user.tag}` },
                { name: "⚠️ Advertencias", value: "Sistema de advertencias aún no implementado" },
                { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` }
            );

        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

        const logEmbed = new EmbedBuilder()
            .setTitle("📕 LOG — Consulta de advertencias")
            .setColor("#95a5a6")
            .addFields(
                { name: "👤 Usuario consultado", value: `${user.tag}` },
                { name: "🛡️ Moderador", value: `${interaction.user.tag}` },
                { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` }
            );

        await sendLog(interaction.guild, logEmbed);
    }
};
