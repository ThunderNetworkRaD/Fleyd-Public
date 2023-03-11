const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ApplicationCommandOptionType } = require("discord.js");
const lang = require("../../lang/locales");

module.exports = {
    data: {
        name: "help",
        description: "Help command",
        options: [
            {
                name: "category",
                description: "Category of commands",
                type: ApplicationCommandOptionType.String,
                required: false,
                choices: [
                    {
                        name: 'Moderation Command',
                        value: 'moderation',
                    },
                    {
                        name: "Premium Commands",
                        value: "premium"
                    },
                    {
                        name: "Tickets Commands",
                        value: "tickets"
                    },
                    {
                        name: "Extra Commands",
                        value: "extra"
                    },
                    {
                        name: "Funning Commands",
                        value: "fun"
                    },
                    {
                        name: "Informativ Commands",
                        value: "info"
                    },
                    {
                        name: "Exclusive commands",
                        value: "server"
                    },
                ],
            },
        ]
    },
      
    execute(interaction) {
        const category = interaction.options.getString("category");
        
        /* Code for:
            category = null
        */
        if (category == null) {
            const embedIniziale = new EmbedBuilder()
                .setDescription(lang.help.init.description[interaction.locale] ?? "Click the button to receive information on the corresponding command category.\nHere is the command category map:\n\n🧰•Moderativ Commands\n⭐•Premium Commands\n🎫•Ticket Commands\n➕•Extra Commands\n 🤣•Funning Commands\n📜•Informative Commands\n💻•Exclusive Commands")
            const MDbutton = new ButtonBuilder()
                .setCustomId("1")
                .setEmoji("🧰")
                .setStyle(ButtonStyle.Danger)
            const PRbutton = new ButtonBuilder()
                .setCustomId("2")
                .setEmoji("⭐")
                .setStyle(ButtonStyle.Success)
            const TKbutton = new ButtonBuilder()
                .setCustomId("3")
                .setEmoji("🎫")
                .setStyle(ButtonStyle.Primary)
            const EXbutton = new ButtonBuilder()
                .setCustomId("4")
                .setEmoji("➕")
                .setStyle(ButtonStyle.Primary)
            const FNbutton = new ButtonBuilder()
                .setCustomId("5")
                .setEmoji("🤣")
                .setStyle(ButtonStyle.Secondary)
            const INbutton = new ButtonBuilder()
                .setCustomId("6")
                .setEmoji("📜")
                .setStyle(ButtonStyle.Success)
            const SRbutton = new ButtonBuilder()
                .setCustomId("7")
                .setEmoji("💻")
                .setStyle(ButtonStyle.Secondary)

            const row = new ActionRowBuilder() //max 5 compontent for row
                .addComponents(MDbutton)
                .addComponents(PRbutton)
                .addComponents(TKbutton)
                .addComponents(EXbutton)
                .addComponents(FNbutton)
                
            const row2 = new ActionRowBuilder()
                .addComponents(INbutton)
                .addComponents(SRbutton)

            interaction.reply({ embeds: [embedIniziale], components: [row, row2] });
            console.log("Ok")
        };

        /* Embeds */
        const moderationEmbed = new EmbedBuilder()
            .setTitle("Moderation Commands - Fleyd")
            .setColor("LightGrey")
            .setDescription(lang.help.mod.description[interaction.locale] ?? "**/ban**\nAllows you to ban a user from the server\n`Usage:` */ban [target] [reason]*\n\n**/kick**\nAllows you to kick a user from the server \n`Usage:` */kick [target] [reason]*\n\n**/mute**\nAllows you to add a TimeOut to a user\n`Usage`: */mute [target] [time] [reason]*\n\n**/unban**\nAllows you to revoke an already executed ban\n`Usage:` */unban [id_target] [reason]*\n\n**/clear**\nAllows you to delete previously sent messages\n`Usage:` */clear [amout] [target]*")
        const premiumEmbed = new EmbedBuilder()
            .setTitle("Premium Commands - Fleyd")
            .setColor("Gold")
            .setDescription(lang.help.premium.description[interaction.locale] ?? "Coming Soon...")
        const tiHelp = new EmbedBuilder()
            .setTitle("Ticket System - Fleyd")
            .setColor("Purple")
            .setDescription(lang.help.tickets.description[interaction.locale] ?? "**/ticket**\nSend the ticket panel\n`Uso:` */ticket*\n\n**/close**\nClose the ticket using the command, instead of the button\n`Uso:` */close [reason]*\n\n**/trascript**\nThe transcript of your ticket is sent to you in dm, *up to the last message before your command*\n`Usage:` */transcript*")
        const extraembed = new EmbedBuilder()
            .setTitle("Extra Commands - Fleyd")
            .setColor("Orange")
            .setDescription(lang.help.extra.description[interaction.locale] ?? "**/dm**\nAllows you to send a message to anyone on the server via the dm bot\n`Usage:` */dm [target] [message]*\n\n**/invite**\ nThe bot sends a button if clicked it sends an invite to add it to your server\n`Usage:` */invite*")
        const funningHelp = new EmbedBuilder()
            .setTitle("Funning Commands - Fleyd")
            .setColor("Green")
            .setDescription(lang.help.fun.description[interaction.locale] ?? "**/ascii**\nAllows you to use *ascii art* to write a message\n`Usage:` */ascii [message]*\n\n**/meme**\nSend a viral meme so random\n`Usage`: */meme*\n\n**/echoo**\nMake the bot send a message of your choice\n`Usage:` */echoo [message]*")
        const serverEmbed = new EmbedBuilder()
            .setTitle("Exclusive Commands - Fleyd")
            .setColor("Red")
            .setDescription(lang.help.esclusivi.description[interaction.locale] ?? "**/request-sponsor**\nAllows you to request a collaboration from the staff\n`Usage:` */request-sponsor [what] [describe] [contactcontacts] [link's]*\n\n**/reply- sponsor**\nAllows you to reply to a sponsorship request\n`Use:` */reply-sponsor [target] [result] [answer] [color]*\n\n**/feedback**\nAllows you to send a judgement/comment/advice to the server\n `Usage:` */feedback [platform] [judgment] [assessment]")
        const infoEmbedCOmmand = new EmbedBuilder()
            .setTitle("Informative Commands - Fleyd")
            .setColor("Blue")
            .setDescription(lang.help.info.description[interaction.locale] ?? "**/bot**\nYou are sent all the main information about the bot\n`Usage:` */bot*\n\n**/ping**\nYou are sent the latency of the bot\n`Usage:` */ping*\n\n**/premium**\nAllows you to have all the information on the premium version of Fleyd\n`Usage:` */premium*\n\n**/uptime**\nAllows you to see how long the bot has been running\n`Usage:` */uptime*\n\n**/bot**\nAllows you to get specific information on the bot\n`Use:` */bot*\n\n**/userinfo**\nThe command allows you to obtain information through the bot on any user present on the server\n`Use:` */userinfo [user]*")


        /* Events interactionCreate to the seven buttons for send embeds */
        client.on("interactionCreate", interaction => {
            if (interaction.customId == "1") {
                interaction.reply({ embeds: [moderationEmbed], ephemeral: true });

            } else if (interaction.customId == "2") {
                interaction.reply({ embeds: [premiumEmbed], ephemeral: true });

            } else if (interaction.customId == "3") {
                interaction.reply({ embeds: [tiHelp], ephemeral: true });

            } else if (interaction.customId == "4") {
                interaction.reply({ embeds: [extraembed], ephemeral: true });

            } else if (interaction.customId == "5") {
                interaction.reply({ embeds: [funningHelp], ephemeral: true });

            } else if (interaction.customId == "6") {
                interaction.reply({ embeds: [infoEmbedCOmmand], ephemeral: true });

            } else if (interaction.customId == "7") {
                interaction.reply({ embeds: [serverEmbed], ephemeral: true });

            }

        })

        /* Switch */
        switch (category) {
            case "moderation": {
                interaction.reply({ embeds: [moderationEmbed] });
            } break
            case "premium": {                  
                interaction.reply({ embeds: [premiumEmbed] });
            } break
            case "tickets": {
                interaction.reply({ embeds: [tiHelp] });
            } break
            case "extra": {     
                interaction.reply({ embeds: [extraembed] });
            } break
            case "fun": {     
                interaction.reply({ embeds: [funningHelp] });
            } break
            case "server": {  
                interaction.reply({ embeds: [serverEmbed] });
            } break
            case "info": {
                interaction.reply({ embeds: [infoEmbedCOmmand] });
            }
        }
    }
}