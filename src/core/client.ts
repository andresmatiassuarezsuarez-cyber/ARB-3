import { Client, Collection, ClientOptions } from "discord.js";

declare module "discord.js" {
    interface Client {
        commands: Collection<string, any>;
    }
}

export class ExtendedClient extends Client {
    public commands: Collection<string, any> = new Collection();

    constructor(options: ClientOptions) {
        super(options);
    }
}
