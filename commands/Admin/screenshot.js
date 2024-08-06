/*
module.exports = {
  name: "screenshot",
  description: "Under maintenance ",
  async execute(client, interaction, Discord) {
    interaction.reply(({content: `Sorry 🙏🏻 This Command Is Under Maintenance` , ephemeral: true})
    );
  }
};
*/
const fetch = require('node-fetch')
const { MessageEmbed } = require("discord.js");

const axios = require('axios').default;
module.exports = {
  name: "screenshot",
  aliases: ["cl", "check"],
  description: "screenshot Any Link",
  options: [
    {
      name: 'url',
      description: 'Put the url to screenshot.',
      type: 'STRING',
      required: true
    },
  ],
  async execute(client, message, Discord) {
    let url1 = message.options.getString('url');

    try {
      let buf = await axios.get(encodeURI(`https://image.thum.io/get/width/1920/crop/1000/noanimate/${url1}`), { responseType: 'arraybuffer' })
      let x = new Discord.MessageAttachment(Buffer.from(buf.data, 'binary'), "image.png");
      let embed = new Discord.MessageEmbed()
        .setColor("DARK_RED")
        .setTimestamp()
        .setTitle("Screenshot")
        .setAuthor({ iconURL: client.user?.displayAvatarURL(), name: client.user?.username })
        .setImage("attachment://image.png")
      return message.reply({ files: [x], embeds: [embed] })

    } catch (_) {
      console.log(_)
      return message.reply("It's not responding <:lm_false:1108074787319853136>. ");
    };
  }
};
