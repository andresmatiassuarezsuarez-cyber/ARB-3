import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { sendLog } from "../../utils/sendLog";

export default {
    data: new SlashCommandBuilder()
        .setName("lock")
        .setDescription("Bloquea el canal actual")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction: any) {
        const channel = interaction.channel;

        await channel.permissionOverwrites.edit(interaction.guild.id, {
            SendMessages: false
        });

        const replyEmbed = new EmbedBuilder()
            .setTitle("🔒 Canal bloqueado")
            .setColor("#9b59b6")
            .addFields(
                { name: "📍 Canal", value: `${channel}` },
                { name: "🛡️ Moderador", value: `${interaction.user.tag}` },
                { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` }
            );

        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

        const logEmbed = new EmbedBuilder()
            .setTitle("📕 LOG — Canal bloqueado")
            .setColor("#9b59b6")
            .addFields(
                { name: "📍 Canal", value: `${channel}` },
                { name: "🛡️ Moderador", value: `${interaction.user.tag}` },
                { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` }
            );

        await sendLog(interaction.guild, logEmbed);
    }
};
