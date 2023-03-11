const Discord = require("discord.js");
const fs = require("fs");

module.exports = async (client) => {
    client.commands = new Discord.Collection();

    const commands = [];

        const commandsFolder = fs.readdirSync("./commands");
            for (const folder of commandsFolder) {
                const commandsFiles = fs
                    .readdirSync(`./commands/${folder}`)
                    .filter((file) => file.endsWith(".js"));
            for (const file of commandsFiles) {
                const command = require(`../commands/${folder}/${file}`);
                commands.push(command.data)
            client.commands.set(command.data.name, command);
            } 
        }


    client.on("ready", async () => {
        await client.application?.commands.set(commands);
    });
}