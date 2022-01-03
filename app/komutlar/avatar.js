const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  let avatar = message.mentions.users.first() || message.author
 let avatarcım = new Discord.MessageEmbed()
  
  .setColor('FF0000')
  .setImage(avatar.avatarURL ({size:1024, dynamic:true, format:'png' }))
 .setAuthor(`${avatar.tag} Adlı kullanıcının Avatarı!`)
  
  message.channel.send(avatarcım)
  
  };
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["av"],
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  description: 'Botta bulunan tüm komutları gösterir',
  usage: 'avatar'
};