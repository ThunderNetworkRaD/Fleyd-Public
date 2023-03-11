const Discord = require("discord.js");

module.exports = {
    name: "row-template",

    execute() {
        const buttonExemple = new Discord.ButtonBuilder()
            .setLabel("Esempio")
            .setCustomId("buttonExemple")
            .setStyle(Discord.ButtonStyle.Primary) //Danger, Primary, Secondary, Link, Success

        const row = new Discord.ActionRowBuilder()
            .addComponents(buttonExemple) //component name
    }
}