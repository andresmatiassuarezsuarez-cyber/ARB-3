import { config } from "dotenv";
import { readdirSync } from "fs";
import path from "path";

config();

const commands: any[] = [];
const commandsPath = path.join(process.cwd(), "src", "commands");
const folders = readdirSync(commandsPath);

console.log("📁 Leyendo comandos desde:", commandsPath);

for (const folder of folders) {
    const folderPath = path.join(commandsPath, folder);

    try {
        const files = readdirSync(folderPath).filter(f => f.endsWith(".ts"));

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const command = require(filePath).default;

            if (command?.data) {
                console.log("➡️ Cargado:", command.data.name);
                commands.push(command.data.toJSON());
            } else {
                console.log("⚠️ Archivo sin comando:", file);
            }
        }
    } catch {
        console.log("❌ No es carpeta:", folder);
    }
}

console.log("\n📌 TOTAL COMANDOS CARGADOS:", commands.length);
console.log("📋 LISTA FINAL:", commands.map(c => c.name));
