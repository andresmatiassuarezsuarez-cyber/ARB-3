import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { sendLog } from "../../utils/sendLog";

export default {
    data: new SlashCommandBuilder()
        .setName("unmute")
        .setDescription("Quita el mute a un usuario")
        .addUserOption(opt =>
            opt.setName("usuario")
               .setDescription("Usuario a desmutear")
               .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction: any) {
        const user = interaction.options.getUser("usuario");
        const member = interaction.guild.members.cache.get(user.id);

        await member.timeout(null);

        const replyEmbed = new EmbedBuilder()
            .setTitle("🔊 Usuario desmuteado")
            .setColor("#2ecc71")
            .addFields(
                { name: "👤 Usuario", value: `${user.tag}`, inline: true },
                { name: "🛡️ Moderador", value: `${interaction.user.tag}`, inline: true },
                { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` }
            )
            .setThumbnail(user.displayAvatarURL());

        await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

        const logEmbed = new EmbedBuilder()
            .setTitle("📕 LOG — Usuario desmuteado")
            .setColor("#2ecc71")
            .addFields(
                { name: "👤 Usuario", value: `${user.tag}` },
                { name: "🛡️ Moderador", value: `${interaction.user.tag}` },
                { name: "⏰ Fecha", value: `<t:${Math.floor(Date.now() / 1000)}:F>` }
            )
            .setThumbnail(user.displayAvatarURL());

        await sendLog(interaction.guild, logEmbed);
    }
};
