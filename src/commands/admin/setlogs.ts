import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import LogsConfig from "../../models/logsConfig";

export default {
    data: new SlashCommandBuilder()
        .setName("setlogs")
        .setDescription("Configura el canal donde se enviarán los logs del bot")
        .addChannelOption(opt =>
            opt.setName("canal")
               .setDescription("Canal donde se enviarán los logs")
               .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: any) {
        const channel = interaction.options.getChannel("canal");

        await LogsConfig.findOneAndUpdate(
            { guildId: interaction.guild.id },
            { channelId: channel.id },
            { upsert: true }
        );

        interaction.reply({
            content: `📡 Canal de logs configurado correctamente: ${channel}`,
            ephemeral: true
        });
    }
};
