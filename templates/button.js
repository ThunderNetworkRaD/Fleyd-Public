const Discord = require("discord.js");

module.exports = {
    name: "button-template",

    execute() {
        const button = new Discord.ButtonBuilder()
            .setLabel("")
            .setCustomId("")
            .setEmoji("")
            .setStyle(Discord.ButtonStyle.Primary) //Danger, Primary, Secondary, Link, Success
            .setURL("")
            .setDisabled()
    }
}