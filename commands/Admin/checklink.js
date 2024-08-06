/*
module.exports = {
  name: "checklink",
  description: "Under maintenance ",
  async execute(client, interaction, Discord) {
    interaction.reply(({content: `Sorry 🙏🏻 This Command Is Under Maintenance` , ephemeral: true})
    );
  }
};
*/

const fetch = require('node-fetch')
const puppeteer = require("puppeteer-core");

const { MessageEmbed } = require("discord.js");
const axios = require('axios').default;
const fs = require('fs')
module.exports = {
  name: "checklink",
  aliases: ["cl", "check"],
  description: "Check Any Link",
  options: [
    {
      name: 'url',
      description: 'Put the url to check.',
      type: 'STRING',
      required: true
    },
  ],
  async execute(client, interaction, Discord) {
    let url1 = interaction.options.getString('url');
    if (!url1.startsWith("http")) return interaction.reply("Please Provide Website URL!");
    await interaction.deferReply()
    const urlAnalysisAPI = 'https://www.virustotal.com/api/v3/urls';
    const API_KEY = process.env.api;
    const headers = {
      accept: 'application/json',
      'x-apikey': API_KEY,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const response = await axios.post(urlAnalysisAPI, { url: url1 }, { headers: headers });
    const analysisID = response.data.data.id;
    const urlAnalysisResultsAPI = `https://www.virustotal.com/api/v3/analyses/${analysisID}`;
    const checkAnalysisStatus = setInterval(async function() {
      const response = await axios.get(urlAnalysisResultsAPI, { headers: headers });
      const analysisStatus = response.data.data.attributes.status;
      if (analysisStatus === 'completed') {
        clearInterval(checkAnalysisStatus);
        const analysisResults = response.data.data.attributes.results;
        console.log()
        if (1 <= response.data.data.attributes.stats.malicious) {
          let buf = await axios.get(encodeURI(`https://image.thum.io/get/width/1920/crop/1000/noanimate/https://www.virustotal.com/gui/url/${response.data.meta.url_info.id}`), { responseType: 'arraybuffer' })
          let x = new Discord.MessageAttachment(Buffer.from(buf.data, 'binary'), "image.png");
          let embed = new Discord.MessageEmbed()
            .setColor("DARK_RED")
            .setTimestamp()
            .setTitle("Link Malicious")
            .setDescription(`${url1} is malicious`)
            .setAuthor({ iconURL: client.user?.displayAvatarURL(), name: client.user?.username })
            .setImage("attachment://image.png")
          interaction.editReply({ embeds: [embed], files: [x] });
        } else {
          let buf = await axios.get(encodeURI(`https://image.thum.io/get/width/1920/crop/1000/noanimate/https://www.virustotal.com/gui/url/${response.data.meta.url_info.id}`), { responseType: 'arraybuffer' })
          let x = new Discord.MessageAttachment(Buffer.from(buf.data, 'binary'), "image.png");

          let embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTimestamp()
            .setTitle("Link Safe")
            .setDescription(`${url1} is safe`)
            .setAuthor({ iconURL: client.user?.displayAvatarURL(), name: client.user?.username })
            .setImage("attachment://image.png")
          interaction.editReply({ embeds: [embed], files: [x] });
        }
      }
    }, 5000);

  }
};
