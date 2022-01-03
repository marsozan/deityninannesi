let Discord = require("discord.js");
let db = require("quick.db")
let { oldu, hata, prefix, bot } = require("../ayarlar.json")
module.exports.run = async (client, message, args) => {
let banyetkili =  await db.fetch(`banyetkili.${message.guild.id}`)
let banlog = await db.fetch(`banlog.${message.guild.id}`)

if(!banyetkili) return message.channel.send(new Discord.MessageEmbed().setDescription(`Ban Yetkili Rolü Ayarlanmamış! : ${prefix}ban-y-rol @rol`).setColor(hata))
  if(!banlog) return message.channel.send(new Discord.MessageEmbed().setDescription(`Ban Log Kanalı Ayarlanmamış! : ${prefix}ban-log #kanal`).setColor(hata))
  
  if(!message.member.roles.cache.has(banyetkili)) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bu Komutu Kullanabilmek İçin Uygun Yetkiye Sahip Değilsin!`).setColor(hata))
  
  
  let kullanıcı = message.mentions.users.first()
  let sebep = args.slice(1).join(' ')
  
  if(!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir Kullanıcı Etiketlemelisin!`).setColor(hata))
  if(!sebep) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir Sebep Belirtmelisin!`).setColor(hata))
  
  if(!message.guild.member(kullanıcı).bannable) return message.channel.send(new Discord.MessageEmbed().setDescription(`Yetkilileri Banlayamam!`).setColor(hata))
  message.guild.member(kullanıcı).ban()
  
  let embed = new Discord.MessageEmbed()
  .addField('İşlem:', 'Ban')
  .addField('Banlayan Yetkili:', `Adı: ${message.author.tag} İd: ${message.author.id}`)
  .addField('Banlanan Üye:', `Adı: ${kullanıcı.tag} İD: ${kullanıcı.id} `)
  .addField('Sebep:', `${sebep}`)
  .setColor(oldu)
  .setFooter(`${bot} Ban Sistemi!`)
  message.guild.channels.cache.get(banlog).send(embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ban"],
  permLevel: 0
};

module.exports.help = {
  name: 'yasakla'
};
