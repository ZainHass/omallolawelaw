
module.exports = {
  name: "linksrole",
  description: "Set A role to allow send links",
  options: [
    {
      name: 'target',
      description: 'Mention Role',
      type: 'ROLE',
      required: true
    }
  ],
  async execute(client, interaction, Discord) {
    let role = interaction.options.getRole('target');
    if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "<:lm_false:1108074787319853136> | You Don't Have Permissions" })
    await client.quickDB.set(`allowr_${interaction.guildId}`, role?.id)
    interaction.reply({
      content: "<:lm_true:1108074817078427658> | Role Has Been Added"
    })
  }
};
