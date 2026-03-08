import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { sendLog } from "../../utils/sendLog";

export default {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Elimina mensajes del canal")
        .addIntegerOption(opt =>
            opt.setName("cantidad")
               .setDescription("Número de mensajes a borrar (1-100)")
               .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction: any) {
        const amount = interaction.options.getInteger("cantidad");

        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: "❌ Debes elegir entre 1 y 100 mensajes.", ephemeral: true });
        }

        await interaction.channel.bulkDelete(amount, true);

        const replyEmbed = new EmbedBuilder()
            .setTitle("🧹 Mensajes eliminados")
            .setColor("#3498db")
            .addFields(
                { name: "🧮 Cantidad", value: `${amount}`, inline: true },
                { name: "🛡️ Moderador", value: `${interaction.user.tag}`, inline: true },
                { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` }
            );

        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

        const logEmbed = new EmbedBuilder()
            .setTitle("📕 LOG — Mensajes eliminados")
            .setColor("#3498db")
            .addFields(
                { name: "🧮 Cantidad", value: `${amount}` },
                { name: "🛡️ Moderador", value: `${interaction.user.tag}` },
                { name: "📍 Canal", value: `${interaction.channel}` },
                { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` }
            );

        await sendLog(interaction.guild, logEmbed);
    }
};
