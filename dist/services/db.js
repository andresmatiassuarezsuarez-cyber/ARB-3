"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectToDatabase(uri) {
    try {
        await mongoose_1.default.connect(uri);
        console.log("🟢 Conectado a MongoDB correctamente.");
    }
    catch (error) {
        console.error("🔴 Error al conectar a MongoDB:", error);
        process.exit(1);
    }
}
