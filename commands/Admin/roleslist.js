
module.exports = {
    name: "roles-list",
    description: "Show Admin Roles for this server",
    async execute(client, interaction, Discord) {
      //if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({content : ":x: | لاتمتلك الصلاحيات المطلوبة"})
      let admin = await client.quickDB.get(`adminr_${interaction.guildId}`) 
      let links = await client.quickDB.get(`allowr_${interaction.guildId}`)
      if(admin) admin = `<@&${admin}>`
      else admin = "No role has been selected"
      if(links) links = `<@&${links}>`
      else links = "No role has been selected"
      let embed = new Discord.MessageEmbed()
      .setColor("#525782")
      .setTimestamp()
      .setTitle("The Roles")
      .setDescription(`
Admins Role : ${admin}
Links Role : ${links}
`)
  .setAuthor({iconURL : client.user?.displayAvatarURL(),name : client.user?.username})
      interaction.reply({
         embeds : [embed],
        ephemeral : true
      })
    }
  };
    