module.exports = {
  name: "allow_domain",
  description: "Add an allowed domain.",
  options: [
    {
      name: 'domain',
      description: 'Website domain. Example: facebook.com',
      type: 'STRING',
      required: true
    }
  ],
  async execute(client, interaction, Discord) {
    let url = interaction.options.getString('domain');
    //if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "<:lm_false:1108074787319853136> | You Don't Have Permissions" })
	
	var URL = require('url-parse')
	var domainRegex = require('domain-name-regex');
	var extractDomain = require('extract-domain');

	if(!await client.quickDB.get(`allowedurls_${interaction.guildId}`)) {
		await client.quickDB.set(`allowedurls_${interaction.guildId}`, [])
    };
	  
	let allowedUrls = await client.quickDB.get(`allowedurls_${interaction.guildId}`) || [];
	let parsedUrl = extractDomain(url);
	  
	if(!parsedUrl) return interaction.reply({content: "❌ Domain is invalid."})
	if(!allowedUrls[0] || !allowedUrls.includes(parsedUrl)) {
		await client.quickDB.push(`allowedurls_${interaction.guildId}`, parsedUrl)
		return interaction.reply({content: "<:lm_true:1108074817078427658> | Domain has been allowed."})
	} else {
		allowedUrls = allowedUrls.filter((value) => value != parsedUrl)
		await client.quickDB.set(`allowedurls_${interaction.guildId}`, allowedUrls);
		return interaction.reply({content: "<:lm_true:1108074817078427658> | Domain has been unallowed."})
	}
  }
};
