let Discord = require("discord.js");
let db = require("quick.db")
let { oldu, hata, prefix } = require("../ayarlar.json")
module.exports.run = async (client, message, args) => {
if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bu komutu, kullanabilmek için gerekli yetkiye sahip değilsin`).setColor(hata))
  
  let type = message.mentions.roles.first()
  if(!type) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir Rol Etiketle!`).setColor(hata))
  
  db.set(`kickyetkili.${message.guild.id}`, type.id)
  message.channel.send(new Discord.MessageEmbed().setDescription(`Kick Atma Yetkilisi Başarıyla ${type} Olarak Ayarlandı`).setColor(oldu))
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kick-y-rol"],
  permLevel: 0
};

module.exports.help = {
  name: 'kick-yetkili-rol'
};
