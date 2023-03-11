const { EmbedBuilder, PermissionFlagBits, ApplicationCommandOptionType } = require("discord.js");
const lang = require("../../lang/locales");
const { sendMondLogs } = require("../../logs/mod-logger");

module.exports = {
    data: {
        name: "role",
        description: "Role actions add/remove",
        options: [
            {
                name: "action",
                description: "Action to role",
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: "Add",
                        value: "add"
                    },
                    {
                        name: "Remove",
                        value: "remove"
                    },
                ],
            },
            {
                name: "role",
                description: "Role ID to add/remove of a user",
                type: ApplicationCommandOptionType.String,
                required: true
            },
            {
                name: "target",
                description: "Target to add/remove role",
                type: ApplicationCommandOptionType.User,
                required: true
            },
        ],
    },

    execute(interaction) {
        /* Option */
        const { member, options, guild, channel } = interaction;

        const target = options.getMember("target");
        const action = options.getString("action");
        const role = options.getString("role");


        /* Permission controls */
        const verifica = new EmbedBuilder()
            .setColor("#ff0000")
            .setDescription(lang.NessunPermesso[interaction.locale] ?? "You do not have permission to run the command!")

        if (!member.permissions.has("MANAGE_ROLES")) {
            return interaction.reply({
                embeds: [verifica],
                ephemeral: true
            });
        }; 

        /* Embeds */
        const embedAdd = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`Succesfuly added <@&${role}> at ${target}`)

        const embedRemove = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`Succesfuly removed <@&${role}> at ${target}`)

        /* Switch Actions */
        switch (action) {
            case "add": {
                target.roles.remove(role);

                interaction.reply({ embeds: [embedAdd]});
            } break
            case "remove": {        
                target.roles.remove(role);

                interaction.reply({ embeds: [embedRemove]});
        }

        /* Logs */
        sendMondLogs({
            author: interaction.user,
            description: `**Comando eseguito:** </${interaction.commandName}:${interaction.commandId}>`,
            fields: [
                {
                    name: "Guild ID:",
                    value: `${guild.id}`,
                    inline: true,
                },
                {
                    name: "Guild Name:",
                    value: `${guild.name}`,
                    inline: true,
                },
                {
                    name: "Channel ID:",
                    value: `${channel.id}`,
                    inline: false,
                },
                {
                    name: "Action:",
                    value: `${action}`,
                    inline: true
                },
                {
                    name: "Role:",
                    value: `${role}`,
                    inline: true
                },
                {
                    name: "User:",
                    value: `${target}`,
                    inline: true
                },
            ]
        })
        }
    }
}