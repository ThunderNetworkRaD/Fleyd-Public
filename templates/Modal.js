const {
    TextInputBuilder,
    ActionRowBuilder,
    ModalBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    TextInputStyle
} = require("discord.js");

module.exports = {
    data: {
        name: "test2",
        description: "Test Modal's",
        defaultMemberPermissions: PermissionFlagsBits.ManageMessages,
    },

    async execute(interaction) {
        // Create the modal
        const modal = new ModalBuilder()
            .setCustomId('myModal')
            .setTitle('My Modal');

        // Add components to modal

        // Create the text input components
        const favoriteColorInput = new TextInputBuilder()
            .setCustomId('favoriteColorInput')
            // The label is the prompt the user sees for this input
            .setLabel("What's your favorite color?")
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short);

        const hobbiesInput = new TextInputBuilder()
            .setCustomId('hobbiesInput')
            .setLabel("What's some of your favorite hobbies?")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Paragraph);

        // An action row only holds one text input,
        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
        const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

        // Add inputs to the modal
        modal.addComponents(firstActionRow, secondActionRow);

        // Show the modal to the user
        await interaction.showModal(modal);


        // Client.on
        client.on("interactionCreate", async interaction => {
            if (!interaction.isModalSubmit()) return;
            if (interaction.customId === 'myModal') {
                // Get the data entered by the user
                const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
                const hobbies = interaction.fields.getTextInputValue('hobbiesInput');
                const channel = client.channels.cache.get("1071708959418888294");
                const embed = new EmbedBuilder();
                channel.send({
                    embeds: [
                        embed.setTitle("My Modal data").addFields(
                            { name: "C", value: `${favoriteColor}`, inline: true },
                            { name: "H", value: `${hobbies}`, inline: true },
                            { name: "User", value: `${interaction.member}`, inline: false }
                        )
                    ]
                });

                await interaction.reply({ content: 'Your submission was received successfully!' });
            }
        });


    }
}
