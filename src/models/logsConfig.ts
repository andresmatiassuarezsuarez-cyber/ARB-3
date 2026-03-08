import { Schema, model } from "mongoose";

const logsConfigSchema = new Schema({
    guildId: { type: String, required: true },
    channelId: { type: String, required: true }
});

export default model("LogsConfig", logsConfigSchema);
