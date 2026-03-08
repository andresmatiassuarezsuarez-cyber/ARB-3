import { REST, Routes } from "discord.js";
import { config } from "dotenv";

config();

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

(async () => {
    try {
        console.log("🧹 Eliminando TODOS los comandos globales...");
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID!),
            { body: [] }
        );
        console.log("✅ Todos los comandos globales han sido eliminados.");
    } catch (error) {
        console.error(error);
    }
})();
