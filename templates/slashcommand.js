const Discord = require("discord.js");

module.exports = {
    data: {
        name: "template-slash-commands", //nome del comando
        description: "Desc template-slash-commands", //descrizione del comando
        options: [
            {
                name: "option",
                description: "Desc Option",
                type: Discord.ApplicationCommandOptionType.String,
                /*
                String, Channel, User, Attachment, Integer, Boolean, Mentionable, Role, Numeber, Subcommand, SubcommandGroup
                */
               required: true
            },
            {
                name: "option2",
                description: "Desc Option 2",
                type: Discord.ApplicationCommandOptionType.String,
                /*
                String, Channel, User, Attachment, Integer, Boolean, Mentionable, Role, Numeber, Subcommand, SubcommandGroup
                */
               required: false
            },
        ],
    },


    execute(interaction) {
        //per riprendere l'opzione del comando
        const opzione = interaction.options.getString("option"); //get<type option> e negli apici il name settato prima
        const opzione2 = interaction.options.getString("option2") || "Nessuna Info"; //Mettere un testo da mettere predefinito se il campo dell'opzione è vuoto
    }
}