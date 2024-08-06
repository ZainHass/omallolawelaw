
module.exports = {
  name: "setlinkchannel",
  description: "Set A role to allow admin commands",
  options: [
    {
      name: 'target',
      description: 'Mention channel',
      type: 'CHANNEL',
      required: true
    }
  ],
  async execute(client, interaction, Discord) {
    let channel = interaction.options.getChannel('target');
    let id = await client.quickDB.get(`adminr_${interaction.guildId}`);
    // if (!id || !interaction.member.roles.cache.has(id))
    //   return interaction.reply({
    //     content: ":lm_false: | You Don't Have Premissions"
    //   });
    await client.quickDB.set(`linksChannel_${interaction.guildId}`, channel?.id)
    interaction.reply({
      content: "<:lm_true:1108074817078427658> | Channel Has Been Added"
    })
  }
};
