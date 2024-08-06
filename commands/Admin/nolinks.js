const db = require("quick.db");
module.exports = {
  name: "nolinks",
  description: "Enable/Display Anti Link",
  async execute(client, interaction, Discord) {
    let id = await client.quickDB.get(`adminr_${interaction.guildId}`)
    if(!id) return interaction.reply({content : ":x: | You Don't Have Permissions"})
    if(!interaction.member.roles.cache.has(id)) return interaction.reply({content : ":x: | You Don't Have Permissions"})
  let get = await client.quickDB.get(`al_${interaction.guild.id}`)
  client.quickDB.set(`al_${interaction.guild.id}`, get ? false : true);
    
  return interaction.reply(`<:lm_protraction:1108074544310267966> NoLinks is now \`${get ? "Off" : "On"}\``)
 }
};
  