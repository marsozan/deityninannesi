let Discord = require("discord.js");
let db = require("quick.db")
let { oldu, hata, prefix } = require("../ayarlar.json")
module.exports.run = async (client, message, args) => {
if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bu komutu, kullanabilmek için gerekli yetkiye sahip değilsin`).setColor(hata))
  
  let type = message.mentions.channels.first()
  if(!type) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir Kanal Etiketle!`).setColor(hata))
  
  db.set(`jaillog.${message.guild.id}`, type.id)
  message.channel.send(new Discord.MessageEmbed().setDescription(`Jaillog Kanalı Başarıyla ${type} Olarak Ayarlandı`).setColor(oldu))
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["jaillog"],
  permLevel: 0
};

module.exports.help = {
  name: 'jail-log'
};
