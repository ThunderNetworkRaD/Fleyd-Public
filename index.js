require('dotenv').config();
const { Client, GatewayIntentBits } = require("discord.js");
global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
    ]
});

const fs = require("fs");

fs.readdirSync("./handlers").forEach((handler) => require(`./handlers/${handler}`)(client));

client.login(process.env.DISCORD_TOKEN)