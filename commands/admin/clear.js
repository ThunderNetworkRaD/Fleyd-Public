const Discord = require("discord.js");
const lang = require("../../lang/locales");

module.exports = {
    data: {
        name: "clear",
        description: "For clear messagges",
        options: [
            {
                name: "amout",
                description: "Number off messages",
                type: Discord.ApplicationCommandOptionType.Number,
                required: true
            },
            {
                name: "target",
                description: "User to delete messages",
                type: Discord.ApplicationCommandOptionType.User,
                required: false
            }
        ],
    },

    async execute(interaction) {
        const amout = interaction.options.getNumber("amout");
        const target = interaction.options.getUser("target") || "No target specified";
        const channel = interaction.channel;

        const messages = await channel.messages.fetch({
            limit: amout + 1,
        });

        const res = new Discord.EmbedBuilder()
            .setColor("0x5fb041")

        const verifica = new Discord.EmbedBuilder()
            .setColor("#ff0000")
            .setDescription(lang.NessunPermesso[interaction.locale] ?? "You do not have permission to run the command!")

        if (!interaction.member.permissions.has("MANAGE_CHANNELS")) {
            return interaction.reply({
                embeds: [verifica],
                ephemeral: true
            });
        };

        if (target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) => {
                if (msg.author.id == target.id && amout > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription((`Succesfuly deleted __${messages.size}__ messages from ${target}`));
                interaction.reply({ embeds: [res] });
            });
        } else {
            await channel.bulkDelete(amout, true).then(messages => {
                res.setDescription((`Succesfuly deleted __${messages.size}__ messages from this channel.`));
                interaction.reply({ embeds: [res] });
            })
        }
    }
}