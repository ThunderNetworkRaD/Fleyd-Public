const { EmbedBuilder, PermissionFlagsBits, ActivityType, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    data: {
        name: "update",
        description: "Update the bot presence",
        defaultMemberPermissions: PermissionFlagsBits.Administrator,
        options: [
            {
                name: "activity",
                description: "Update bot activity",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "type",
                        description: "Pick an activity",
                        type: ApplicationCommandOptionType.String,
                        required: true,
                        choices: [
                            {
                                name: "Playing",
                                value: "Playing"
                            },
                            {
                                name: "Streaming",
                                value: "Streaming"
                            },
                            {
                                name: "Listening",
                                value: "Listening"
                            },
                            {
                                name: "Watching",
                                value: "Watching"
                            },
                            {
                                name: "Competing",
                                value: "Competing"
                            },
                        ],
                    },
                    {
                        name: "activity",
                        description: "Set activity bot string",
                        type: ApplicationCommandOptionType.String,
                        required: true,
                    },
                ],
            },
            {
                name: "status",
                description: "Update bot status",
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "type",
                        description: "Pick a status option",
                        type: ApplicationCommandOptionType.String,
                        required: true,
                        choices: [
                            {
                                name: "Online",
                                value: "online"
                            },
                            {
                                name: "Idle",
                                value: "idle"
                            },
                            {
                                name: "Do not disturb",
                                value: "do not disturb"
                            },
                            {
                                name: "Invisible",
                                value: "invisible"
                            },
                        ],
                    },
                ],
            },
        ],
    },

    async execute(interaction) {
        const { options } = interaction;

        const sub = options.getSubcommand(["activity", "status"]);
        const type = options.getString("type");
        const activity = options.getString("activity");

        try {

            switch(sub) {
                case "activity": 
                    switch(type) {
                        case "Playing": {
                            client.user.setActivity({ type: ActivityType.Playing });
                        }
                        case "Streaming": {
                            client.user.setActivity({ type: ActivityType.Streaming });
                        }
                        case "Listening": {
                            client.user.setActivity({ type: ActivityType.Listening });
                        }
                        case "Watching": {
                            client.user.setActivity({ type: ActivityType.Watching });
                        }
                        case "Competing": {
                            client.user.setActivity({ type: ActivityType.Competing });
                        }
                    }
                case "status": {
                    client.user.setPresence({ status: type });
                } break;
            }

        } catch (err) {
            console.log(err);
        }

        const embed = new EmbedBuilder();

        return interaction.reply({ embeds: [
            embed.setDescription(`Succesfully updated yout ${sub} to **${type}**.`),
            embed.setColor("Green")
        ], ephemeral: false })
    }
}