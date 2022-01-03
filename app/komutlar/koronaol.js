const Discord = require ("discord.js");
exports.run = (client, message) => {
  
  
  var Ozycode = new Discord.MessageEmbed()
  
  .setColor("RANDOM")
  .setDescription(`Keşbiş olsun Maskeni tak ${message.author.username}`)
  .setImage(`https://media.tenor.com/images/d01dd81eda6ae15df61fa7d32e848269/tenor.gif`)
  
  message.channel.send(Ozycode)
  
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "",
  permLevel: 0
};
module.exports.help = {
  name: 'koronaol',
};