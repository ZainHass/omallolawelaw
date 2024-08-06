module.exports = {
  name: "link",
  description: "Take A Server Link",
  async execute(client, interaction, Discord) {
    interaction.channel
      .createInvite({ maxAge: 86400, maxUses: 15 })
      .then(async invite => {
        interaction.user
          .send(
            `<:lm_link:1108074903254597632> Link : ${invite.url}
Time : 1 Day
Uses : 15`
          )
          .catch(err => {
            interaction.reply("<:lm_rocket:1108074954374795264> Open Your Private To Send The Link");
          });
        
        interaction.reply({content : `<:lm_rocket:1108074954374795264> The Link Has Been Sent In Private`, ephemeral: true});
      });
  }
};
  