let Discord = require("discord.js");
let db = require("quick.db")
let { oldu, hata, prefix, bot } = require("../ayarlar.json")
module.exports.run = async (client, message, args) => {
let kickyetkili =  await db.fetch(`kickyetkili.${message.guild.id}`)
let kicklog = await db.fetch(`kicklog.${message.guild.id}`)

if(!kickyetkili) return message.channel.send(new Discord.MessageEmbed().setDescription(`Kick Yetkili Rolü Ayarlanmamış! : ${prefix}kick-y-rol @rol`).setColor(hata))
  if(!kicklog) return message.channel.send(new Discord.MessageEmbed().setDescription(`Kick Log Kanalı Ayarlanmamış! : ${prefix}kick-log #kanal`).setColor(hata))
  
  if(!message.member.roles.cache.has(kickyetkili)) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bu Komutu Kullanabilmek İçin Uygun Yetkiye Sahip Değilsin!`).setColor(hata))
  
  
  let kullanıcı = message.mentions.users.first()
  let sebep = args.slice(1).join(' ')
  
  if(!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir Kullanıcı Etiketlemelisin!`).setColor(hata))
  if(!sebep) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir Sebep Belirtmelisin!`).setColor(hata))
  
  if(!message.guild.member(kullanıcı).kickable) return message.channel.send(new Discord.MessageEmbed().setDescription(`Yetkilileri Kickleyemem!`).setColor(hata))
  message.guild.member(kullanıcı).kick()
  
  let embed = new Discord.MessageEmbed()
  .addField('İşlem:', 'Kick')
  .addField('Kickleyen Yetkili:', `Adı: ${message.author.tag} İd: ${message.author.id}`)
  .addField('Kicklenen Üye:', `Adı: ${kullanıcı.tag} İD: ${kullanıcı.id} `)
  .addField('Sebep:', `${sebep}`)
  .setColor(oldu)
  .setFooter(`${bot} Kick Sistemi!`)
  message.guild.channels.cache.get(kicklog).send(embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kick"],
  permLevel: 0
};

module.exports.help = {
  name: 'at'
};
