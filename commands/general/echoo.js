const Discord = require("discord.js");

module.exports = {
    data: {
        name: "echoo",
        description: "Send the message in your place",
        options: [
            {
                name: "message",
                description: "Message set for the send bot",
                type: Discord.ApplicationCommandOptionType.String,
                required: true
            },
        ],
    },

    execute(interaction) {
        const msg = interaction.options.getString("message");
        
        interaction.reply({ content: `${msg}`, ephemeral: false })
    }
}