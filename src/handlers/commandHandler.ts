import { Collection } from "discord.js";
import { ExtendedClient } from "../core/client";
import { readdirSync } from "fs";
import path from "path";

export function loadCommands(client: ExtendedClient) {
    client.commands = new Collection();

    const commandsPath = path.join(__dirname, "..", "commands");
    const folders = readdirSync(commandsPath);

    for (const folder of folders) {
        const folderPath = path.join(commandsPath, folder);
        const files = readdirSync(folderPath).filter(f => f.endsWith(".ts"));

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const command = require(filePath).default;

            if (!command?.data || !command?.execute) continue;

            client.commands.set(command.data.name, command);
            console.log(`⚙️ Comando cargado: ${command.data.name}`);
        }
    }
}
