const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async(client, message, args) => { 


  if(message.author.bot) return;
  if(message.channel.type === "dm") return console.log("Bu Sistem DM'de Kullanilamaz")


    if(message.member.hasPermission("ADMINISTRATOR")) {

        let is3 = message.mentions.roles.first()
        if(!is3) return message.reply("Lütfen Erkek rolünü belirt.")       
      
            db.set(`erk_${message.guild.id}`, is3.id)
            message.channel.send("Erkek rolü başarıyla ayarlandı:  <@&" + is3 + ">" )
          }else{
            message.reply("Yeterli yetkiye sahip değilsin!").then(msg => {
              msg.delete({ timeout: 10000 })
            })
        }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ekr','erkekrol'],
  permLevel: 0,

};

exports.help = {
  name: 'erkekkayıtrol',
  description: '',
  usage: '',
 
};