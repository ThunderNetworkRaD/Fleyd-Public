const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    data: {
        name: "warnings",
        description: "Warning system",
        options: [
            {
                name: "SubCommandName",
                description: "SubCommand Description.",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "SubCommandOptionName",
                        description: "SubCommandOption description",
                        type: ApplicationCommandOptionType.String,
                        required: true
                    },
                    {
                        name: "SubCommandOptionName",
                        description: "SubCommandOption description",
                        type: ApplicationCommandOptionType.Channel,
                        required: false
                    }
                ],
            },
        ],
    },


    execute(interaction) {
        /* Opzioni Importanti */
        const { options } = interaction;

        const sub = options.getSubcommand(["SubCommandName"]); //Import SubCommand
        const opzione = options.getString("OptionName"); //Option
        const opzione2 = options.getString("OptionName") || "Text"; //Option = null ?? "Text" to send
    }
}