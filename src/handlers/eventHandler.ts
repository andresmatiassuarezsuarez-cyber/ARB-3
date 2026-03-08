import { Client } from "discord.js";
import { readdirSync } from "fs";
import path from "path";

export function loadEvents(client: Client) {
    const eventsPath = path.join(__dirname, "..", "events");
    const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith(".ts"));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);

        if (!event || !event.default) continue;

        const eventName = file.replace(".ts", "");
        client.on(eventName, event.default);

        console.log(`📡 Evento cargado: ${eventName}`);
    }
}
