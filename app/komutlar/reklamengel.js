const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {

  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(` Bu komudu kullanabilmek için "Sunucuyu Yönet" yetkisine sahip olman gerek.`)
  if (!args[0]) return message.channel.send(`:no_entry: Reklam Filtresini Ayarlamak İçin \`!reklam-engelleme aç\` | Kapatmak İstiyorsanız \`!reklam-engelleme kapat\` Yazabilirsiniz`)
  if (args[0] !== 'aç' && args[0] !== 'kapat') return message.channel.send(`:no_entry: Reklam Filtresini Ayarlamak İçin \`!reklam-engelleme aç\` | Kapatmak İstiyorsanız \`!reklam-engelleme kapat\` Yazabilirsiniz`)

    if (args[0] == 'aç') {
    db.set(`reklamFiltre_${message.guild.id}`, 'acik')
    let i = await db.fetch(`reklamFiltre_${message.guild.id}`)
        const sa = new Discord.MessageEmbed()
  message.channel.send(`Reklam Engelleme başarıyla açıldı!`)   
    
  }

  if (args[0] == 'kapat') {
      
    db.delete(`reklamFiltre_${message.guild.id}`)
    const sa = new Discord.MessageEmbed()
    message.channel.send(`Reklam Rngelleme başarıyla kapatıldı!`)
  }
 
};


exports.conf = {
 enabled: true,
 guildOnly: false,
  aliases: ['reklam', 'reklam-filtresi', 'reklamfiltresi', 'reklam-filtre', 'reklamfiltre','reklamengel'],
 permLevel: 2
};

exports.help = {
 name: 'reklam-engelleme',
 description: 'reklamm',
 usage: 's$$kanal'
};