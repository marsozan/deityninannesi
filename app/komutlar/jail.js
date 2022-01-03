let Discord = require("discord.js");
let ms = require("ms")
let db = require("quick.db")
let { oldu, hata, prefix, bot } = require("../ayarlar.json")
module.exports.run = async (client, message, args) => {
let jailyetkili = await db.fetch(`jailyetkili.${message.guild.id}`)
let jaillog = await db.fetch(`jaillog.${message.guild.id}`)
let jailrol = await db.fetch(`jailrol.${message.guild.id}`)

if(!jailyetkili) return message.channel.send(new Discord.MessageEmbed().setDescription(`Jail Yetkilisi Ayarlanmamış : ${prefix}jail-y-rol @rol`).setColor(hata))
  if(!jailrol) return message.channel.send(new Discord.MessageEmbed().setDescription(`Jail Rolü Ayarlanmamış : ${prefix}jailrol @rol`).setColor(hata))
if(!jaillog) return message.channel.send(new Discord.MessageEmbed().setDescription(`Jail Log Ayarlanmamış : ${prefix}jaillog #kanal`).setColor(hata))

  
  if(!message.member.roles.cache.has(jailyetkili)) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin`).setColor(hata))
  
let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  let sebep = args.slice(1).join(' ')
  let zaman = args[1]
  if(!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir Kullanıcı Etiketlemelisin!`).setColor(hata))
  if(!sebep) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir Sebep Belirtmelisin!`).setColor(hata))
  
  let kullanıcımbenim = kullanıcı.roles.cache.forEach(async r => {
    let jailcim = await db.fetch(`jailrol.${message.guild.id}`)
    kullanıcı.roles.remove(r.id)
    kullanıcı.roles.add(jailcim)
  })

const embed = new Discord.MessageEmbed()
.addField('İşlem:', 'Jail')
.addField('Jaillenen Üye:', `${kullanıcı}`)
.addField('Jail Atan Yetkili:', `${message.author.tag}`)
.addField('Sebep:', sebep)
.setColor(oldu)
.setFooter(`${bot} Jail Sistemi!`)
message.guild.channels.cache.get(jaillog).send(embed)
  let dm = new Discord.MessageEmbed()
  .addField('İşlem:', 'Jail')
  .addField('Jail Sebepin:', sebep)
  .setColor(oldu)
  .setFooter(`${bot} Jail Sistemi`)
  kullanıcı.send(dm)
  

          }
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: 'jail'
};
//Wenzy Code
