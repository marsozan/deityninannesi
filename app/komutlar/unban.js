let Discord = require("discord.js");
let db = require("quick.db")
let { oldu, hata, prefix, bot } = require("../ayarlar.json")
module.exports.run = async (client, message, args) => {
let banyetkili =  await db.fetch(`banyetkili.${message.guild.id}`)
let banlog = await db.fetch(`banlog.${message.guild.id}`)

if(!banyetkili) return message.channel.send(new Discord.MessageEmbed().setDescription(`Ban Yetkili Rolü Ayarlanmamış! : ${prefix}ban-y-rol @rol`).setColor(hata))
  if(!banlog) return message.channel.send(new Discord.MessageEmbed().setDescription(`Ban Log Kanalı Ayarlanmamış! : ${prefix}ban-log #kanal`).setColor(hata))
  
  if(!message.member.roles.cache.has(banyetkili)) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bu Komutu Kullanabilmek İçin Uygun Yetkiye Sahip Değilsin!`).setColor(hata))
  
let id = args[0]
let sebep = args[0]
if(!id) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir İD Giriniz.`).setColor(hata))
  if(isNaN(id)) return message.channel.send(new Discord.MessageEmbed().setDescription(`Lütfen Geçerli Bir İD Giriniz!`).setColor(hata))
  if(!sebep) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir Sebep Belirtmelisin!`).setColor(hata))
  
  message.guild.fetchBans().then(ban => {
    if(ban.size === '0') return message.channel.send(new Discord.MessageEmbed().setDescription(`Bu Sunucuda Kimse Yasaklanmamış!`).setColor(hata))
    
    let banlanan = ban.find(b => b.user.id === id)
    if(!banlanan) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bu Sunucuda Böyle Bir Kişi Yasaklanmamış!`).setColor(hata))
    
    message.guild.members.unban(banlanan.user)
    let embed = new Discord.MessageEmbed()
    .addField('İşlem:', 'Unban')
    .addField('Unban Yapılan Üye:', `${id}`)
    .addField('Unban Yapan Yetkili:', `Adı: ${message.author.tag} İd: ${message.author.id}`)
    .addField('Sebep:', sebep)
    .setColor(oldu)
    .setFooter(`${bot} Ban Sistemi!`)
    message.guild.channels.cache.get(banlog).send(embed)
  })
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["unban"],
  permLevel: 0
};

module.exports.help = {
  name: 'yasaklama'
};
