const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Clear A Messages From Any Chat",
  options: [
    {
      name: "messages_size",
      description: "Message Size",
      type: "NUMBER"
    }
  ],
  async execute(client, interaction, Discord) {
    let clear_size = interaction.options.getNumber("messages_size") || 99;
    let id = await client.quickDB.get(`adminr_${interaction.guildId}`);
    if (!id)
      return interaction.reply({
        content: "<:lm_false:1108074787319853136> | لا تمتلك الصلاحيات المطلوبة"
      });
    if (!interaction.member.roles.cache.has(id))
      return interaction.reply({
        content: "<:lm_false:1108074787319853136> | لا تمتلك الصلاحيات المطلوبة"
      });
    if (clear_size < 2 || clear_size > 100) {
      let embed22 = new MessageEmbed()
        .setColor("#cf1919")
        .setDescription(
          "<:lm_gold:1108074602590113833> Please Type a number between 2 - 100 for clear messages"
        );
      return interaction.reply({ embeds: [embed22] });
    }

    if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
      let embed = new MessageEmbed()
        .setColor("#cf1919")
        .setDescription("<:lm_false:1108074787319853136> You dont have `MANAGE_MESSAGES` permission.");
      return interaction.reply({ embeds: [embed] });
    }

    if (!interaction.guild.me.permissions.has("MANAGE_MESSAGES")) {
      let embed1 = new MessageEmbed()
        .setColor("#cf1919")
        .setDescription("<:lm_false:1108074787319853136> I dont have `MANAGE_MESSAGES` permission.");
      return interaction.reply({ embeds: [embed1] });
    }

    try {
      let num = clear_size;
      if (num <= 100 && num > 1) {
        interaction.channel.messages
          .fetch({ limit: num })
          .then(messages => {
            interaction.channel.bulkDelete(messages).then(() => {
              interaction
                .reply({
                  embeds: [
                    new MessageEmbed()
                      .setDescription(
                        `<:lm_true:1108074817078427658> Done, \`${messages.size}\` messages have been deleted.`
                      )
                      .setColor("#cf1919")
                  ]
                })
                .then(m =>
                  setTimeout(() => {
                    m.delete();
                  }, 1000)
                );
            });
          });
        interaction.deleteReply().catch(O_o => { });
      }
    } catch (err) {
      interaction.reply("<:lm_false:1108074787319853136> There was an error!\n" + err).catch(() => { });
    }
  }
};
