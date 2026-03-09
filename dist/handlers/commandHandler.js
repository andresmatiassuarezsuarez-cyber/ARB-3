"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCommands = loadCommands;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
function loadCommands(client) {
    client.commands = new discord_js_1.Collection();
    const commandsPath = path_1.default.join(__dirname, "..", "commands");
    const folders = (0, fs_1.readdirSync)(commandsPath);
    for (const folder of folders) {
        const folderPath = path_1.default.join(commandsPath, folder);
        const files = (0, fs_1.readdirSync)(folderPath).filter(f => f.endsWith(".ts"));
        for (const file of files) {
            const filePath = path_1.default.join(folderPath, file);
            const command = require(filePath).default;
            if (!command?.data || !command?.execute)
                continue;
            client.commands.set(command.data.name, command);
            console.log(`⚙️ Comando cargado: ${command.data.name}`);
        }
    }
}
