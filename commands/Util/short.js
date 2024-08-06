const fetch = require('node-fetch')
const shorten = require("isgd");
module.exports = {
  name: "short",
  description: "Short Any Link",
  options: [
    {
      name: 'url',
      description: 'Put the url to short.',
      type: 'STRING',
      required: true
    },
    {
      name: 'site',
      description: 'Choose the website to short with.',
      type: 'STRING',
      choices: [
        {
          name: 'i8.ae',
          value: '1'
        },
        {
          name: 'is.gd',
          value: '2'
        }
      ],
      required: true
    }
  ],
  async execute(client, interaction, Discord) {
  let url = interaction.options.getString('url');
  let site = interaction.options.getString('site');
    if(site == "1"){
fetch(`https://i8.ae/api/url/add`, {
  method: "POST",
  body: JSON.stringify({
    url: url,
  
  }),
  headers: {
    Authorization: `QDONH2eb9Kz5HAifXZs3`,
    "Content-Type": "application/json",
  },
})
  .then((json) => json.json())
  .then((link) => {
    interaction.reply(`<:lm_link:1108074903254597632> This is your link:\n${link.shorturl}`);
  });
}else{
  shorten.shorten(url, function(res) {
    if (res.includes('Error')) return interaction.reply('**Please, enter valid URL**');
    interaction.reply(`<:lm_link:1108074903254597632> This is your link:\n${res}`);  });
}
  }
};
  