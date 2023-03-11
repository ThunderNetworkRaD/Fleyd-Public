const Discord = require("discord.js");

module.exports = {
    name: "template-embed",


    execute() {
        const NameEmbed = new Discord.EmbedBuilder()
            .setAuthor({ name: "",  })
            .setTitle("")
            .setDescription("")
            .setColor("") //name color o #ffff per esempio
            .addFields(
                { name: "", value: ``, inline: true/false },
                { name: "", value: ``, inline: true/false },
            )
            .setImage("") //url img
            .setThumbnail("") //url img
            .setURL() //url
            .setTimestamp() 
            .setFooter({ text: "", iconURL: client.user.displayAvatarURL() }) //per img del bot
    }
}