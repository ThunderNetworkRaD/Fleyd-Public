const fs = require("fs");

module.exports = async (client) => {
    const eventsFiles = fs
        .readdirSync("./events")
        .filter((file) => file.endsWith(".js"));
    
    for (const file of eventsFiles) {
        const event = require(`../events/${file}`);
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}