const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "bot",
  description: "Show The Bot Info",
  async execute(client, interaction, Discord) {
    await client.guilds.fetch(); // يجلب جميع الخوادم

    const totalMembers = client.guilds.cache.reduce(
      (prev, guild) => prev + guild.memberCount,
      0
    );

    const embed = new MessageEmbed()
      .setColor("#525782")
      .addField(
        "**Contact**",
        `✯・Soon   <:lm_contact:1155426447926775878> `
      )
      .addField(
        "**Mention Bot**",
        `✯・<@781623083990908940> <:lm_lmlogo:1155427153396113489>  `
      )
      .addField(
        "**Servers**  ",
        `**✯・ ${client.guilds.cache.size}** <:lm_servers:1155427045086601226>  `,
        true
      )
      .addField(
        "**Channels**   ",
        `**✯・ ${await client.channels.cache.size}** <:lm_slashcommands:1155426359196258386>  `,
        true
      )
      .addField(
        "**Users**  ",
        `**✯・${totalMembers}** <:lm_about:1155424714227974244>`,
        true
      )
      .addField(
        "**Developers **",
        `✯・ <@541177328965779457>, <@743899010967928965>
        & <@344745455768436736> <:lm_devs:1155424675871084554>
`
      )

      .setFooter(
        `Requested By ${interaction.user.username}`,
        interaction.user.displayAvatarURL({ dynamic: true })
      );
    interaction.reply({embeds: [embed]});
  }
};
