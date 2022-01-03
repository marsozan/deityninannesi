const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
	if (!message.guild) {
    const synex = new Discord.MeggageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL())
    .addField('Korkut')
    return message.author.send(synex); }
    if (message.channel.type !== '..') {
      const sunucubilgi = new Discord.MessageEmbed()
    .setAuthor('BÖÖÖÖÖÖÖÖÖÖÖÖÖ Korktun mu la :D?')
    .setColor('RANDOM')
    .setTimestamp()
    .setDescription('')
		.setImage(`https://78.media.tumblr.com/452063fcc1533a028f27cba85291d644/tumblr_ms8w5wWoOT1spwp48o1_500.gif`)
    return message.channel.send(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'korkut',
  description: 'Bot Sizi Korkutur.',
  usage: 'korkut'
};