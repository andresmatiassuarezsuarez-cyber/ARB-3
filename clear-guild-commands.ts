import { REST, Routes } from "discord.js";
import { config } from "dotenv";

config();

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

const GUILD_ID = "ID_DE_TU_SERVIDOR";

(async () => {
    try {
        console.log("🧹 Eliminando comandos del servidor...");
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID!, GUILD_ID),
            { body: [] }
        );
        console.log("✅ Comandos del servidor eliminados.");
    } catch (error) {
        console.error(error);
    }
})();
