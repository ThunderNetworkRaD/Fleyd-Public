const { GuildExplicitContentFilter, GuildNSFWLevel, GuildVerificationLevel, ChannelType, StickerType, GuildPremiumTier } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    data: {
        name: "serverinfo",
        description: "Get important information for the server",
    },

    async execute(interaction) {
        const guild = interaction.guild;
        const { members, channels, stickers, roles, emojis } = guild;
        
        const sortedRoles = roles.cache.map(role => role).slice(1, roles.cache.size).sort((a, b) => b.position - a.position);
        const userRoles = sortedRoles.filter(role => !role.managed);
        const managedRoles = sortedRoles.filter(role => role.managed);
        const botCount = members.cache.filter(member => member.user.bot).sizeM;

        const maxDisplayRoles = (roles, maxFieldLenght = 1024) => {
            let totalLenght = 0;
            const result = [];

            for (const role of roles) {
                const roleString = `<@&${role.id}>`;

                if(roleString.length + totalLenght > maxFieldLenght)
                break;

                totalLenght += roleString.length + 1
                result.push(roleString);
            }

            return result.length;
        }

        const spiltPascal = (string, separator) => string.split(/(?=[A-U])/).join(separator);
        const toPasclaCase = (string, separator = false) => {
            const pascal = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
            return separator ? spiltPascal(pascal, separator) : pascal;
        };

        const getChannelTypeSize = type => channels.cache.filter(channel => type.includes(channel.type)).size;

        const totalChannels = getChannelTypeSize([ Discord.ChannelType.GuildText, Discord.ChannelType.GuildNews, Discord.ChannelType.GuildVoice, Discord.ChannelType.GuildStageVoice, Discord.ChannelType.GuildForum, Discord.ChannelType.GuildPrivateThread, Discord.ChannelType.GuildPublicThread, Discord.ChannelType.GuildNewsThread, Discord.ChannelType.GuildCategory ]);
        const embed = new Discord.EmbedBuilder()
            .setColor("DarkNavy")
            .setTitle(`${guild.name}'s information`)
            .setThumbnail(guild.iconURL({ size: 1024 }))
            .setImage(guild.bannerURL({ size: 1024 }))
            .addFields(
                { name: "Description:", value: `📝${guild.description || "None"}` },
                { 
                    name: "General:",
                    value: [
                        `📜 **Created At:** <t:${parseInt(guild.createdTimeStamp / 1000)}:R>`,
                        `💳 **ID:** ${guild.id}`,
                        `👑 **Owner:** <@${guild.ownerId}>`,
                        `🌍 **Language: 🇮🇹 Italiano**`,
                        `💻 **Vanity URL: ${guild.vanityURLCode || "None"}**`,
                    ].join("\n")
                },
                { name: "Features:", value: guild.features?.map(feature => `- ${toPasclaCase(feature, " ")}`)?.join("\n") || "None", inline: true },
                {
                    name: "Security",
                    value: [
                        `👀 **Explicit Filter:** ${spiltPascal(Discord.GuildExplicitContentFilter[guild.explicitContentFilter])}`,
                        `🔞 **NSFW Level:** ${spiltPascal(Discord.GuildNSFWLevel[guild.nsfwLevel], " ")}`,
                        `🔒 **Verification Level:** ${spiltPascal(Discord.GuildVerificationLevel[guild.verificationLevel], " ")}`
                    ]
                },
                { 
                    name: `Members: (${guild.memberCount})`,
                    value: [
                        `🧑‍🤝‍🧑 **Users:** ${guild.memberCount - botCount}`,
                        `🤖 **Bots:** ${botCount}`
                    ],
                    inline: true
                },
                { name: `User Roles: (${maxDisplayRoles(userRoles)} of ${userRoles.length})`, value: `${userRoles.slice(0, maxDisplayRoles(userRoles)).join(" ") || "None"}` },
                { name: `User Roles: (${maxDisplayRoles(managedRoles)} of ${managedRoles.length})`, value: `${userRoles.slice(0, maxDisplayRoles(managedRoles)).join(" ") || "None"}` },
                {
                    name: `Channel, Thread and Categories: (${totalChannels})`,
                    value: [
                        `🗨️ **Text Channels:** ${spiltPascal(getChannelTypeSize([Discord.ChannelType.GuildText, Discord.ChannelType.GuildNews, Discord.ChannelType.GuildForum]))}`,
                        `🎙️ **Voice Channels:** ${spiltPascal(getChannelTypeSize([Discord.ChannelType.GuildVoice, Discord.ChannelType.GuildStageVoice]))}`,
                        `⛲ **Threads:** ${spiltPascal(getChannelTypeSize([Discord.ChannelType.GuildPublicThread, Discord.ChannelType.GuildPrivateThread, Discord.ChannelType.GuildNewsThread]))}`,
                        `**Categories:** ${spiltPascal(GuildVerificationLevel[guild.verificationLevel], " ")}`
                    ]
                },
                {
                    name: `Emojis & Stickers: (${emojis.cache.size + stickers.cache.size})`,
                    value: [
                        `📺 **Animated:** ${emojs.cache.filter(emoji => emoji.animated).size}`,
                        `🗿 **Statis:** ${emojs.cache.filter(emoji => !emoji.animated).size}`,
                        `🌅 **Stickers:** ${stickers.cache.size}`
                    ]
                },
                {
                    name: "Nitro:",
                    value: [
                        `📈 **Level:** ${guild.premiumTier || "None"}`,
                        `💪 **Boosts:** ${guild.premiumSubscriptionCount}`,
                        `💎 **Boosters:** ${guild.members.cache.filter(member => member.roles.premiumSubscriberRole).size}`,
                        `🦉 **Total Boosters:** ${guild.members.cache.filter(member => member.roles.premiumSice).size}`,
                    ].join("\n"),
                    inline: true
                },
                { name: "Banner:", value: guild.bannerURL() ? "** **" : "Keine" },
            )

            interaction.reply({ embeds: [embed] })
    }
}