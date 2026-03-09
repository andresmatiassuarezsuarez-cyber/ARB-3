import { GatewayIntentBits, Partials } from "discord.js";
import { config } from "dotenv";
import { connectToDatabase } from "./services/db";
import { loadEvents } from "./handlers/eventHandler";
import { loadCommands } from "./handlers/commandHandler";
import { ExtendedClient } from "./core/client";

config();

// Crear cliente extendido
const client = new ExtendedClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember
    ]
});

// Cargar eventos y comandos
loadEvents(client);
loadCommands(client);

// Evento ready
client.once("ready", () => {
    console.log(`🤖 Bot iniciado como ${client.user?.tag}`);
});

// Conectar a MongoDB
connectToDatabase(process.env.MONGO_URI as string);

// Iniciar sesión
client.login(process.env.DISCORD_TOKEN as string);