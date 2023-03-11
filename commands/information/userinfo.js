const Discord = require("discord.js");

module.exports = {
    data: {
        name: "userinfo",
        description: "To get information da user",
        options: [
            {
                name: "user",
                description: "User to get info",
                type: Discord.ApplicationCommandOptionType.User,
                required: false
            },
        ],
    },

    async execute(interaction) {
        const user = interaction.options.getUser("user") || interaction.member;
        const member = await interaction.guild.members.cache.get(user.id);
        const icon = user.displayAvatarURL();
        const tag = user.tag;

        const embed = new Discord.EmbedBuilder()
            .setColor("Blue")
            .setAuthor({ name: tag, iconURL: icon })
            .addFields(
                {
                    name: "Name:",
                    value: `${user}`,
                    inline: false
                },
                {
                    name: "Roles:",
                    value: `${member.roles.cache.map(r => r).join(`` )}`,
                    inline: false
                },
                {
                    name: "Joined Server:",
                    value: `<t:${parseInt(member.joinedAt / 1000)}:R>`,
                    inline: true
                },
                {
                    name: "Joined Discord:",
                    value: `<t:${parseInt(member.user.createdAt / 1000)}:R>`,
                    inline: true
                },
            )
            .setFooter({ text: `User ID: ${user.id}`})
            .setTimestamp()

        await interaction.reply({ embeds: [embed] })

    }
}