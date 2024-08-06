module.exports = {
  name: "vote",
  description: "<:njom:1098067577617522830>  Get The Vote Link",
  async execute(client, interaction, Discord) {
    let button = new Discord.MessageActionRow()


    .addComponents(
            new Discord.MessageButton()
      .setStyle('LINK')
      .setLabel('LexBox')
      .setURL(`https://discord.gg/Y3PwSzBFKc`))
    interaction.reply(({content: `<:lm_upvote:1108082850038820894> Vote Link : https://top.gg/bot/781623083990908940/vote ` , ephemeral: true})
    );
  }
};
  