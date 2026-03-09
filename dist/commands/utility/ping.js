"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Responde con Pong!"),
    async execute(interaction) {
        await interaction.reply("🏓 Pong!");
    }
};
