const Discord = require("discord.js");
const db = require("quick.db");


exports.run = async (client, message, args) => {

const yardım = new Discord.MessageEmbed()
.setColor("BLUE")
.setAuthor("")
.setTitle("🍁 Unforgiving Yardım Menüsü [BAKIMDA]")
  .setTimestamp()
      .addField('**⭐️-Moderasyon (15)**',` \n` +  '`küfür`, `reklam`, `kick`,`ban`,`jail`,`sayaç`,`kanal-koruma`,`modlog`,`slowmode`,`bansay`,`rolal`,`rolver`,`sa-as`,`çek`,`sil`')
      .addField('**⭐️-Kayıt (2)**',` \n` +  '`erkek`,`kadın`')
      .addField('**⭐️-Eğlence (9)**',` \n` +  '`dürüm`,`atatürk`,`altın`,`neonmavi`,`wasted`,`sunucuresmi`,`koronaol`,`fbi`,`korkut`')
      .addField('**⭐️-Kullanıcı (3)**',` \n` +  '`kbilgi`,`sbilgi`,`afk`')
message.channel.send(yardım)
}

exports.conf = {
  enabled: true, 
  guildOnly: false,   
   aliases: ["komutlar","y","help","yardım"],
  permLevel: `Yetki gerekmiyor.` 
};

exports.help = {
  name: 'yardım',
  category: 'kullanıcı',
  description: 'Yardım Menüsü.',
   usage:'!yardım'
}