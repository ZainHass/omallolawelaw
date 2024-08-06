module.exports = {
  name: "ping",
  description: "See A Bot Ping",
  async execute(client, interaction, Discord) {
    interaction.reply(
      interaction.reply({content: `pong!`, fetchReply: true})
        .then(msg =>
          msg.edit(
            `\`\`\`javascript\nTime Taken: ${msg.createdTimestamp -
              interaction.createdTimestamp} \nDiscord API: ${
              client.ws.ping
            } \n\`\`\``
          )
        )
    );
  }
};
  