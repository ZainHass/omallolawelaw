const fsp = require("fs/promises")
const path = require('path')
const Discord = require("discord.js");
module.exports = {
  name: "help",
  description: "Show This Menu",
  async execute(client, interaction, Discord) {
    const getDirectories = async source =>
      (await fsp.readdir(source, { withFileTypes: true }))
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
    console.log(__dirname);
    let catgs = await getDirectories(path.join(__dirname, '..'))
    let row = new Discord.MessageActionRow()
    let select = new Discord.MessageSelectMenu().setCustomId("helpselect").setMaxValues(1).setPlaceholder("Select Category")
    catgs.forEach(x => {
      console.log(x)
      select.addOptions([{
        label: x,
        value: `help_${x}`,
      }])
    })
    row.addComponents(select)
    let embed = new Discord.MessageEmbed()
      .setColor("#525782")
      .setTimestamp()
      .setTitle("My Commands")
      .setDescription(`We present to you the first bot specialized in the field of links, Link Manager.
Where it gives you a useful and wonderful experience and many features, including checking and protecting links, in addition to the above, you can get a picture of what the site contains, and all the user's private information is encrypted.
You can also specify a rank for sending links, and you can also specify an admin rank to do admin-related commands.
There are many useful things that you should try as soon as possible.`)
      .setAuthor({ iconURL: client.user?.displayAvatarURL(), name: client.user?.username })

    interaction.reply({
      components: [row],
      embeds: [embed]
    })
  }
};
