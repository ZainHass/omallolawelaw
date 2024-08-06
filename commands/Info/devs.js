const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "devs",
  description: "Developers Information",
  async execute(client, interaction, Discord) {
    const embed = new MessageEmbed()
      .setColor("#525782")
     // .addField("Zain [Owner]","I'm The Owner And Developer. , I'm From Iraq.")
      //.addField("SMASHER [Mohanad]","I'm Dashbord And Prime Developer. , I'm From Egypt")
      //.addField("Slow [Hasan]","I'm Administration Manager And Server Manager. , I'm From Iraq.")
      .setDescription("Under maintenance")
      .setFooter(
        `Requested By ${interaction.user.username}`,
        interaction.user.displayAvatarURL({ dynamic: true })
      );
    interaction.reply({embeds: [embed]});
  }
};  