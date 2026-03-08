import mongoose from "mongoose";

export async function connectToDatabase(uri: string) {
    try {
        await mongoose.connect(uri);
        console.log("🟢 Conectado a MongoDB correctamente.");
    } catch (error) {
        console.error("🔴 Error al conectar a MongoDB:", error);
        process.exit(1);
    }
}
