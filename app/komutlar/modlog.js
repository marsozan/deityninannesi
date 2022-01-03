const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
 
exports.run = async(client, message, args) => {

let prefix = ayarlar.prefix
  
let k = message.mentions.channels.first()

  if (!k) {
    const sa = new Discord.MessageEmbed()
    .setDescription(`*Kanal belirtmeyi unutmuşsun.*`)
    .setTimestamp()
    return message.channel.send(sa)
  }
    
    db.set(`modlog_${message.guild.id}`,k.id)
       const sa = new Discord.MessageEmbed()
    .setDescription(`*Modlog kanalı ${k} olarak ayarlandı!* \n *Sunucuda geçen olayları buradan takip edebilirsiniz!*`)
    .setTimestamp()
    return message.channel.send(sa)
  
};
exports.conf = {
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'modlog'
}; 