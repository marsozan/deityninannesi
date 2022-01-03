const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
//

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
  .setTitle(`${client.user.username}`)
    .setAuthor(message.author.username, message.author.avatarURL)
  .setColor("BLUE")
  .setFooter(`© ${client.user.username}` , client.user.avatarURL)
  .setThumbnail("")
  .setDescription('Moderasyon Sistemi için Sunucunuza Ekleyebilirsiniz.')
  .setTimestamp()
  .addField("Davet Linki.", `[Destek Sunucusu](https://discord.gg/DkyCSxVY3u)`, false)
  .setURL('https://discord.com/oauth2/authorize?client_id=782307103154110504&scope=bot&permissions=8')
  	.setThumbnail(client.user.avatarURL);

  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'davet'
};