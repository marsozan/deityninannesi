const Discord = require('discord.js');
const data = require('quick.db');


exports.run = async (client, message, args) => {
if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed().setDescription('Dostum Bu komutu kullanabilmek için `Mesajları Yönet` iznine sahip olman lazım :('));
if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription('Silinecek Miktarı Girmediniz.'));
if(args[0] > 100) return message.channel.send(new Discord.MessageEmbed().setDescription('`100` üzeri mesaj miktarını aynı anda silmem imkansız.'));
message.channel.bulkDelete(args[0]);
return message.channel.send(new Discord.MessageEmbed().setDescription(' 🌹 '+`${args[0]}`+' Kadar mesaj silindi.')).then(m => m.delete({timeout: 5000}));
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sil","clear","temizle"],
  permLevel: 0
}

exports.help = {
  name: 'sil'
};