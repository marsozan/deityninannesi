let Discord = require("discord.js");
let { oldu, hata, prefix } = require("../ayarlar.json")
module.exports.run = async (client, message, args) => {
let guild = message.guild


guild.fetchBans().then(bans => message.channel.send(new Discord.MessageEmbed().setDescription(`
Sunucunuzda ${bans.size} Ban Bulunmaktadır` ).setColor(oldu)))

}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["banliste", "bansay", "ban-say"],
  permLevel: 0
};

module.exports.help = {
  name: 'ban-liste'
};
