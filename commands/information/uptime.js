const Discord = require("discord.js");

module.exports = {
    data: {
        name: "uptime",
        description: "Shows you the uptime of the bot",
    },

    async execute(interaction) {
        const days = Math.floor(client.uptime / 86400000);
        const hours = Math.floor(client.uptime / 3600000) % 24;
        const minutes = Math.floor(client.uptime / 60000) % 60;
        const seconds = Math.floor(client.uptime / 1000) % 60;

        const embed = new Discord.EmbedBuilder()
            .setTitle(`__${client.user.username}'s Uptime__`)
            .setColor("Blue")
            .setTimestamp()
            .addFields(
                { name: "Uptime:", value: ` \`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds` }
            )

        interaction.reply({ embeds: [embed] })
    }
}