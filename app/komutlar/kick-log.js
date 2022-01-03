let Discord = require("discord.js");
let db = require("quick.db")
let { oldu, hata, prefix } = require("../ayarlar.json")
module.exports.run = async (client, message, args) => {
if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bu komutu, kullanabilmek için gerekli yetkiye sahip değilsin`).setColor(hata))
  
  let type = message.mentions.channels.first()
  if(!type) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir Kanal Etiketle!`).setColor(hata))
  
  db.set(`kicklog.${message.guild.id}`, type.id)
  message.channel.send(new Discord.MessageEmbed().setDescription(`Kicklog Başarıyla ${type} Olarak Ayarlandı`).setColor(oldu))
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kicklog"],
  permLevel: 0
};

module.exports.help = {
  name: 'kick-log'
};
