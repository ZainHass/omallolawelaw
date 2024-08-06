module.exports = {
  name: "invite",
  description: "Invite Link",
  async execute(client, interaction, Discord) {
    interaction.reply(({content: `<:lm_plus:1108074683242397697> Invite Link : https://discord.com/api/oauth2/authorize?client_id=781623083990908940&permissions=8&scope=bot` , ephemeral: true})
    );
  }
};
  