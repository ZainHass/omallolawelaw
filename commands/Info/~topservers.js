const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "top-servers",
  description: "Top servers on Link Manager!",
  async execute(client, interaction, Discord) {
    if (!interaction.member.roles.cache.has('831923677724409947'))   
       return interaction.reply({ content: `🤔 | wew this command just for the developers`, ephemeral: true })
    let count = undefined;
    const top = client.guilds.cache
      .sort((a, b) => b.memberCount - a.memberCount)
      .map((g) => g);
    if (!count) count = 10;
    if (isNaN(count)) count = 10;
    if (count <= 0) count = 10;
    if (count > top.length) count = top.length;
    let embed = new MessageEmbed();
    for (let i = 0; i < count; i++) {
      embed.addField(
        `**${top[i].name}** : ${top[i].memberCount}`,
        " ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎"
      );
    }
    embed.setTitle(`**Top ${count} Servers**`);
    embed.setThumbnail(
      interaction.user.avatarURL({
        dynamic: true,
      })
    );
    embed.setTimestamp();
    embed.setColor("#525782");
    embed.setFooter(
      client.user.username,
      client.user.avatarURL({
        dynamic: true,
      })
    );
    interaction.reply({ embeds: [embed] });
  },
};