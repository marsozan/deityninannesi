const Discord = require("discord.js");

exports.run = async (client, message, args) => {
 
 const synex = new Discord.MessageEmbed()

.setColor("WHITE")
.setImage("https://media1.giphy.com/media/QUY2pzDAKVpX3QacCg/200.gif")
.setTitle("FBI Open Up!");

  message.channel.send(synex);
}; 

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["fbi"],
  permLevel: `Yetki Yok`
};

exports.help = {
  name: "fbi",
  description: "FBi gif atar",
  usage: "fbi"
};