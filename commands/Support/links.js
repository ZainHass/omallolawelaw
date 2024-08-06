const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "links",
  description: "Bot Links",
  async execute(client, interaction, Discord) {
    let embed = new MessageEmbed()
      .setColor("#18ebb4")
      .setThumbnail(
        "https://f.top4top.io/p_3078p1fam1.png"
      ).setDescription(`** Invite : [Click Here](https://linkmanager.glitch.me/invite.html)
Support : [Click Here](https://discord.gg/dYNERWs7Vu)
Website [Click Here](https://linkmanager.glitch.me)
GitHub : [Click Here](https://github.com/Link-Manager)
X (Twitter) : [Click Here](https://x.com/LinkManager_)
Instagram : [Click Here](https://instagram.com/link_manager)
Top.gg : [Click Here](https://top.gg/bot/781623083990908940)
Vote For Me : [Click Here](https://top.gg/bot/781623083990908940/vote)**`)
 .setFooter({ text: 'Link Manager', iconURL: 'https://k.top4top.io/p_3078heabq1.png' });
    interaction.reply({embeds: [embed]});
  }
};
  