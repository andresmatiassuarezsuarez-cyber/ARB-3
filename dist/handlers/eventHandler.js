"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEvents = loadEvents;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
function loadEvents(client) {
    const eventsPath = path_1.default.join(__dirname, "..", "events");
    const eventFiles = (0, fs_1.readdirSync)(eventsPath).filter(file => file.endsWith(".ts"));
    for (const file of eventFiles) {
        const filePath = path_1.default.join(eventsPath, file);
        const event = require(filePath);
        if (!event || !event.default)
            continue;
        const eventName = file.replace(".ts", "");
        client.on(eventName, event.default);
        console.log(`📡 Evento cargado: ${eventName}`);
    }
}
