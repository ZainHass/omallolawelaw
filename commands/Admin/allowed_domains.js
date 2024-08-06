module.exports = {
  name: "allowed_domains",
  description: "View allowed domain.",
  async execute(client, interaction, Discord) {
    //if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "<:lm_false:1108074787319853136> | You Don't Have Permissions" })
	
	if(!await client.quickDB.get(`allowedurls_${interaction.guildId}`)) {
		await client.quickDB.set(`allowedurls_${interaction.guildId}`, [])
    };
	  
	let allowedUrls = await client.quickDB.get(`allowedurls_${interaction.guildId}`) || [];
	if(!allowedUrls[0]) return interaction.reply({ content: "❌ Theres no allowed domains." })

	return interaction.reply({ content: `🔗 **Allowed Domains:**\n${allowedUrls.join(', ')}` })
  }
};
