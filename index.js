const http = require("http");
const express = require("express");
const app = express();
require("dotenv").config()
app.listen(() => console.log("start bot"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});

const Discord = require('discord.js');
const Topgg = require("@top-gg/sdk");

const { Database } = require("quickmongo");
const { QuickDB } = require("quick.db");
const path = require('path')
const cmd = require("node-cmd");
const fs = require("fs");
const fsp = require("fs/promises");
const { log } = require("console");
const getUrls = require("get-urls");
const URL = require('url-parse')
const domainRegex = require('domain-name-regex');
const extractDomain = require('extract-domain');

const getDirectories = async source =>
  (await fsp.readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const client = new Discord.Client({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES',
    'GUILD_MEMBERS'
  ]
});

client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

client.db = new Database(process.env.mongo);
client.quickDB = new QuickDB();

client.db.on('ready', () => {
  console.log("Database Connected.");
  const users = client.users.cache.filter(user => !user.bot);
  console.log(users.size);
});


client.on("guildDelete" , async guild => {
  client.quickDB.delete(`linksChannel_${guild.id}`)
  client.quickDB.delete(`al_${guild.id}`)
  client.quickDB.delete(`allowr_${guild.id}`)
  client.quickDB.delete(`allowedurls_${guild.id}`)

  console.log(`data for ${guild.id} has been successfully removed.`)
})

client.on('ready', () => {
  const totalMembers = client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0);
  console.log(`Total members: ${totalMembers}`);
});

client.db.on('error', err => { console.log(err) });

setInterval(() => {
  if (!client?.user) {
    process.kill(1);
  }
}, 10000);

const prefix = "-";

client.on("ready", async () => {
  let commandsArray = [];
  let files = [];

  const getFilesRecursively = (directory) => {
    const filesInDirectory = fs.readdirSync(directory);
    for (const file of filesInDirectory) {
      const absolute = path.join(directory, file);
      if (fs.statSync(absolute).isDirectory()) {
        getFilesRecursively(absolute);
      } else {
        files.push(absolute);
      }
    }
  };
  files = files.filter((file) => file.endsWith(".js") && !file.startsWith("~"))
  getFilesRecursively('./commands')
  for (const file of files) {
    const command = require(`./${file}`.replaceAll("\\", "/"));
    client.commands.set(command.name, command);
    commandsArray.push(command)
  };
  await client.application?.commands.set(commandsArray).catch(console.log)
  console.log(
    `${client.user.tag} Connected.\n[${client.guilds.cache.size}] Servers`
  );
  await client.db.connect();
  //client.guilds.cache.map(r => console.log(r.name,r.id))
  client.user.setPresence({
    activities: [{ name: "/help", type: "WATCHING" }],
    status: "idle",
  });
});

const webhook = new Topgg.Webhook("linkmanagernewvotetoken111new1linkmanager");
const vote_role = "780847469205520434";

app.post("/api/vote", webhook.listener((vote) => {
  let { bot, user, type, query, isWeekend } = vote;
  if (type !== "upvote") return;
  const channel = client.channels.cache.get("791947391620218890");
  if (channel) {
    channel.send(`<@${user}> Thank you for voting for me! <a:8Red_Heart:795521202647072768>
<:lm_upvote:1108082850038820894> Vote for me on top.gg : <https://top.gg/bot/781623083990908940/vote>`).catch(err => { });
    const member = channel.guild.members.cache.get(user);
    if (member) member.roles.add(vote_role).catch(err => { console.log(err); });
  };
}));

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const commandName = interaction.commandName
    const command = client.commands.get(commandName)
    if (!command) return;
    let on_or_off = await client.db.get(`${interaction.user.id}.blacklist`);
    if (on_or_off === null) on_or_off = false;
    if (on_or_off == true) return interaction.reply("You're blacklisted");

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;
    if (timestamps.has(interaction.user.id)) {
      const expirationTime = timestamps.get(interaction.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return interaction
          .reply({ content: `Cooldown **${timeLeft.toFixed(1)}** Seconds`, ephemeral: true })
      }
    }
    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
    try {
      command.execute(client, interaction, Discord);
    } catch (error) {
      console.error(error);
      interaction.reply(`🙄 Error: ${error.message}`);
    }
  }
});


client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  let member = message.mentions.members.first();
  if (member && member.id == client.user.id) {
    let embed = new Discord.MessageEmbed()
      .setColor("#525782")
      .setTimestamp()
      .setTitle("About Me")
      .setDescription(`We present to you the first bot specialized in the field of links, Link Manager.
Where it gives you a useful and wonderful experience and many features, including checking and protecting links, in addition to the above, you can get a picture of what the site contains, and all the user's private information is encrypted.
You can also specify a rank for sending links, and you can also specify an admin rank to do admin-related commands.
There are many useful things that you should try as soon as possible.`)
    return message.reply({ embeds: [embed] })
  };
  let channel = await client.quickDB.get(`linksChannel_${message.guild.id}`)
  if (channel === message.channel.id) return;
  let blockedurls = await client.quickDB.get(`al_${message.guild.id}`)
  if (!blockedurls) return;
  if (message.member.permissions.has("ADMINISTRATOR")) return;
  let role = await client.quickDB.get(`allowr_${message.guild.id}`)
  let urls = Array.from(getUrls(message.content));
  if (urls[0]) {
	  
	urls = extractDomain(urls);
	let allowedUrlsData = await client.quickDB.get(`allowedurls_${message.guild.id}`);
	  
	if(allowedUrlsData && allowedUrlsData[0]) {
	  let allowedUrlsInContent = urls.every((url) => allowedUrlsData.includes(url))
	  if (allowedUrlsInContent) return;
	 };
	  
	  if (role && message.member?.roles.cache.has(role)) return;
        
	  message.delete().catch(() => 0);
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isSelectMenu()) return
  if (!interaction.values[0].startsWith("help_")) return
  let ar = interaction.values[0].split("_")[1]
  var files = fs.readdirSync(`./commands/${ar}/`);
  let nf = files.filter(f => f.endsWith(".js") && !f.startsWith('~'))
  nf = nf.map(x => x.split(".")[0]);
  nf = nf.map(c => `/${c} - ${require(`./commands/${ar}/${c}`).description}`)
  let embed = new Discord.MessageEmbed()
    .setColor("#525782")
    .setAuthor({ iconURL: client.user?.displayAvatarURL(), name: client.user?.username })
    .setTimestamp()
    .setDescription(nf.join("\n"))
    .setTitle(`${ar} Commands`)
    .setImage("https://b.top4top.io/p_3078cnne01.png")
  interaction.update({ embeds: [embed] })
})


client.login(process.env.token).catch(console.log);

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'Reason:', reason);
});

/*
const { MessageEmbed, MessageAttachment } = require('discord.js');
const sharp = require('sharp');
const fetch = require('node-fetch');
const shortUrl = require('short-url-api');

client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command !== 'shortimage') return;

  const attachment = message.attachments.first();

  if (!attachment) {
    return message.reply('Please upload an image.');
  }

  const imageResponse = await fetch(attachment.url);
  const imageBuffer = await imageResponse.buffer();

  shortUrl.short(attachment.url)
    .then(res => {
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Shortened Image URL')
        .setDescription(`Shortened URL: ${res}`);

      const thumbnail = new MessageAttachment(imageBuffer, 'thumbnail.png');

      message.channel.send({ embeds: [embed], files: [thumbnail] });
    })
    .catch(err => {
      console.error(err);
      return message.reply('An error occurred while shortening the URL.');
    });
});
*/
//join server
client.on('messageCreate', async(message) => {
	if(message.content == 'emit') {
		client.emit('guildCreate', message.guild)
	}
})
client.on('guildCreate', async guild => {
  console.log(guild.channels.cache.forEach((channel) => { console.log(channel.permissionsOverwrites) }))
  const channel = client.channels.cache.get('1090173954175533076')
  const embed = new Discord.MessageEmbed()
    .setTitle(`<:servers:1098076449367408690> New Guild !`)
    .addField(` <:servers:1098076449367408690> Name`, `**${guild.name}**`, true)
    .addField(`<:about:1098076585350934628> Id`, `**${guild.id}**`, true)
    .addField(`<:members:1098073142204837998> Members`, `**${guild.memberCount}**`, true)
    .addField(`<:website:1098068794108293242> Verification Level : `, `**${guild.verificationLevel}**`, true)
    .addField(` 👑 Owner Ship : `, `<@${guild.ownerId}>`, true)
    .addField(`👑 My Servers Now : `, `${client.guilds.cache.size}`, true)
  channel.send({ embeds: [embed] })
})

client.on('guildDelete', async guild => {
  const channel = client.channels.cache.get('1090174005262172231')
  const embed = new Discord.MessageEmbed()
    .setTitle(`<:servers:1098076449367408690> Leave Server`)
    .addField(`<:servers:1098076449367408690> Name`, `**${guild.name}**`, true)
    .addField(`<:about:1098076585350934628> Id`, `**${guild.id}**`, true)
    .addField(`<:members:1098073142204837998> Members`, `**${guild.memberCount}**`, true)
    .addField(`<:website:1098068794108293242> Verification Level :`, `**${guild.verificationLevel}**`, true)
    .addField(`👑 Owner Ship : `, `<@${guild.ownerId}>`, true)
    .addField(`👑 My Servers Now : `, `${client.guilds.cache.size}`, true)
  channel.send({ embeds: [embed] })
})