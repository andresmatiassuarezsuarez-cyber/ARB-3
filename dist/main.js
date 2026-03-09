"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
const db_1 = require("./services/db");
const eventHandler_1 = require("./handlers/eventHandler");
const commandHandler_1 = require("./handlers/commandHandler");
const client_1 = require("./core/client");
(0, dotenv_1.config)();
// Crear cliente extendido
const client = new client_1.ExtendedClient({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent
    ],
    partials: [
        discord_js_1.Partials.Message,
        discord_js_1.Partials.Channel,
        discord_js_1.Partials.GuildMember
    ]
});
// Cargar eventos y comandos
(0, eventHandler_1.loadEvents)(client);
(0, commandHandler_1.loadCommands)(client);
// Evento ready
client.once("ready", () => {
    console.log(`🤖 Bot iniciado como ${client.user?.tag}`);
});
// Conectar a MongoDB
(0, db_1.connectToDatabase)(process.env.MONGO_URI);
// Iniciar sesión
client.login(process.env.DISCORD_TOKEN);
