
module.exports = {
  name: "adminrole",
  description: "Set A role to allow admin commands",
  options: [
    {
      name: 'target',
      description: 'Mention Role',
      type: 'ROLE',
      required: true
    }
  ],
  /**
   * 
   * @param {*} client 
   * @param {*} interaction 
   * @param {*} Discord 
   */
  async execute(client, interaction, Discord) {
    let role = interaction.options.getRole('target');
    if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "<:lm_false:1108074787319853136> | You Dont Have Permissions " })
    await client.quickDB.set(`adminr_${interaction.guildId}`, role?.id)
    interaction.reply({
      content: "Role Has Been Added"
    })
  }
};
