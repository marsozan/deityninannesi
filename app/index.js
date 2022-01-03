const Discord = require('discord.js');//wenzy Yunus Emre
const client = new Discord.Client();//wenzy Yunus Emre
const ayarlar = require('./ayarlar.json');//wenzy Yunus Emre
const chalk = require('chalk');//wenzy Yunus Emre
const moment = require('moment');//wenzy Yunus Emre
var Jimp = require('jimp');//wenzy Yunus Emre
const { Client, Util } = require('discord.js');//wenzy Yunus Emre
const fs = require('fs');//wenzy Yunus Emre
const db = require('quick.db');//wenzy Yunus Emre
const http = require('http');//wenzy Yunus Emre
const express = require('express');//wenzy Yunus Emre
require('./util/eventLoader.js')(client);//wenzy Yunus Emre
const path = require('path');//wenzy Yunus Emre
const snekfetch = require('snekfetch');//wenzy Yunus Emre

const app = express();//wenzy Yunus Emre
app.get("/", (request, response) => {//wenzy Yunus Emre
  console.log(Date.now() + "Ozy 7/24 AKTİF TUTMA İŞLEMİ BAŞARILI");//wenzy Yunus Emre
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {//wenzy Yunus Emre
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);//wenzy Yunus Emre
}, 280000);//wenzy Yunus Emre

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);//wenzy Yunus Emre
    log(`${files.length} komut yüklenecek.`);//wenzy Yunus Emre
    files.forEach(f => {//wenzy Yunus Emre
        let props = require(`./komutlar/${f}`);//wenzy Yunus Emre
        log(`Yüklenen komut: ${props.help.name}.`);//wenzy Yunus Emre
        client.commands.set(props.help.name, props);//wenzy Yunus Emre
        props.conf.aliases.forEach(alias => {//wenzy Yunus Emr//wenzy Yunus Emree
            client.aliases.set(alias, props.help.name);//wenzy Yunus Emre
        });//wenzy Yunus Emre
    });//wenzy Yunus Emre
});//wenzy Yunus Emre




client.reload = command => {//wenzy Yunus Emre
    return new Promise((resolve, reject) => {//wenzy Yunus Emre
        try {//wenzy Yunus Emre
            delete require.cache[require.resolve(`./komutlar/${command}`)];//wenzy Yunus Emre
            let cmd = require(`./komutlar/${command}`);//wenzy Yunus Emre
            client.commands.delete(command);//wenzy Yunus Emre
            client.aliases.forEach((cmd, alias) => {//wenzy Yunus Emre
                if (cmd === command) client.aliases.delete(alias);//wenzy Yunus Emre//wenzy Yunus Emre
            });//wenzy Yunus Emre
            client.commands.set(command, cmd);//wenzy Yunus Emre
            cmd.conf.aliases.forEach(alias => {//wenzy Yunus Emre
                client.aliases.set(alias, cmd.help.name);//wenzy Yunus Emre
            });//wenzy Yunus Emre
            resolve();//wenzy Yunus Emre
        } catch (e) {//wenzy Yunus Emre
            reject(e);//wenzy Yunus Emre
        }//wenzy Yunus Emre
    });//wenzy Yunus Emre
};//wenzy Yunus Emre
//wenzy Yunus Emre
client.load = command => {//wenzy Yunus Emre
    return new Promise((resolve, reject) => {//wenzy Yunus Emre
        try {//wenzy Yunus Emre
            let cmd = require(`./komutlar/${command}`);//wenzy Yunus Emre
            client.commands.set(command, cmd);//wenzy Yunus Emre
            cmd.conf.aliases.forEach(alias => {//wenzy Yunus Emre
                client.aliases.set(alias, cmd.help.name);//wenzy Yunus Emre
            });//wenzy Yunus Emre
            resolve();//wenzy Yunus Emre
        } catch (e) {//wenzy Yunus Emre
            reject(e);//wenzy Yunus Emre
        }//wenzy Yunus Emre
    });//wenzy Yunus Emre
};//wenzy Yunus Emre




client.unload = command => {//wenzy Yunus Emre
    return new Promise((resolve, reject) => {//wenzy Yunus Emre
        try {//wenzy Yunus Emre
            delete require.cache[require.resolve(`./komutlar/${command}`)];//wenzy Yunus Emre
            let cmd = require(`./komutlar/${command}`);//wenzy Yunus Emre
            client.commands.delete(command);//wenzy Yunus Emre
            client.aliases.forEach((cmd, alias) => {//wenzy Yunus Emre
                if (cmd === command) client.aliases.delete(alias);//wenzy Yunus Emre
            });//wenzy Yunus Emre
            resolve();//wenzy Yunus Emre
        } catch (e) {//wenzy Yunus Emre
            reject(e);//wenzy Yunus Emre
        }//wenzy Yunus Emre
    });//wenzy Yunus Emre
};//wenzy Yunus Emre

client.elevation = message => {//wenzy Yunus Emre
    if (!message.guild) {//wenzy Yunus Emre
        return;//wenzy Yunus Emre
    }//wenzy Yunus Emre
    let permlvl = 0;//wenzy Yunus Emre
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;//wenzy Yunus Emre
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;//wenzy Yunus Emre
    if (message.author.id === ayarlar.sahip) permlvl = 4;//wenzy Yunus Emre
    return permlvl;//wenzy Yunus Emre
};//wenzy Yunus Emre

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;//wenzy Yunus Emre
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {//wenzy Yunus Emre
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));//wenzy Yunus Emre
});//wenzy Yunus Emre
//wenzy Yunus Emre
client.on('error', e => {//wenzy Yunus Emre
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));//wenzy Yunus Emre
});//wenzy Yunus Emre

client.login(ayarlar.token);
//wenzy Yunus Emre
//---------------------------------KOMUTLAR---------------------------------\\

/////////////////////////////MOD LOG AYARLAMA////////////////////////////////
client.on("messageDelete", async message => {
  let a = await db.fetch(`modlog_${message.guild.id}`)
  if (a) {
    const sa = new Discord.MessageEmbed()
    .setTitle('Mesaj Silindi')
    .setDescription(` **${message.author.tag}** a ait **${message.content}** adlı mesajı silindi`)
    .setTimestamp()
    client.channels.cache.get(a).send(sa)
  }
})
client.on("channelDelete", async channel => {
  let a = await db.fetch(`modlog_${channel.guild.id}`)
  if (a) {
    const sa = new Discord.MessageEmbed()
    .setTitle('Kanal Silindi')
    .setDescription(`**${channel.name}** Adlı Kanal Silindi!`)
    .setTimestamp()
    client.channels.cache.get(a).send(sa)
  }
})
client.on("channelCreate", async channel => {
  let a = await db.fetch(`modlog_${channel.guild.id}`)
  if (a) {
    const sa = new Discord.MessageEmbed()
    .setTitle('Kanal Oluşturuldu')
    .setDescription(`**${channel.name}** Adlı Kanal Oluşturuldu!`)
    .setTimestamp()
    client.channels.cache.get(a).send(sa)
  }
})

//////////////////////////// REKLAM ENGEL
client.on("message", async msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
        
    let i = await db.fetch(`reklamFiltre_${msg.guild.id}`)  
          if (i == 'acik') {
              const reklam = ["discord.app", "discord.gg", "https://","discordapp","discordgg",".com",".org",".tk",".ru","CodeMarefi",];
              if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                  if (!msg.member.hasPermission("MANAGE_WEBHOOKS")) {
                    msg.delete();                                           
                    return msg.channel.send(`${msg.author}, Hey dostum! Bu Sunucuda reklam yapamazsın.`).then(msg => msg.delete(25000));
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!i) return;
          });

//////////////////////// KÜFÜR ENGEL
client.on("message", async msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
        
    let i = await db.fetch(`küfürFiltre_${msg.guild.id}`)  
          if (i == 'acik') {
              const küfür = ["oç","amcık", "yarrak", "orospu","piç", "sikerim", "sikik", "amına", "pezevenk", "yavşak", "ananı", "anandır", "orospu", "evladı", "göt", "pipi", "sokuk", "yarak", "bacını", "karını","amk","aq","mk","anaskm",];
              if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                  if (!msg.member.hasPermission("MANAGE_WEBHOOKS")) {
                    msg.delete();                                          
                    return msg.channel.send(`${msg.author}, Hey küfür etmeden konuş dostum.`).then(msg => msg.delete(25000));
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!i) return;
          });   

////////////DAVET

client.on('message', msg => {
        if (msg.content.toLowerCase() === '!davet') { 
              msg.channel.send(' (https://discord.com/oauth2/authorize?client_id=782307103154110504&scope=bot&permissions=8) Linke tıklayarak kendi sunucunuza ekleyebilirsiniz!:wink:'); 
        } 
      });
      ;

//----------------------------------------------\\
client.on("message", async msg => {
 
 
  const i = await db.fetch(`ssaass_${msg.guild.id}`);
    if (i == 'acik') {
      if (msg.content.toLowerCase() == 'sa' || msg.content.toLowerCase() == 's.a' || msg.content.toLowerCase() == 'selamun aleyküm' || msg.content.toLowerCase() == 'sea'|| msg.content.toLowerCase() == 'selam') {
          try {
 
                  return msg.reply('Aleyküm Selam Hoşgeldin Dostum :wave:')
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (i == 'kapali') {
   
    }
    if (!i) return;
 
    });

///////////////////SAYAÇ

client.on("message", async message => {
  if (!message.guild) return;

  if (db.has(`sayac_${message.guild.id}`) === true) {
    if (db.fetch(`sayac_${message.guild.id}`) <= message.guild.members.cache.size) {
      const embed = new Discord.MessageEmbed()
        .setTitle(`Tebrikler ${message.guild.name}!`)
        .setDescription(`Başarıyla \`${db.fetch(`sayac_${message.guild.id}`)}\` kullanıcıya ulaştık! Sayaç sıfırlandı!`)
        .setColor("RANDOM");
      message.channel.send(embed);
      message.guild.owner.send(embed);
      db.delete(`sayac_${message.guild.id}`);
    }
  }
});
client.on("guildMemberRemove", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

    member.guild.channels.cache.get(channel).send(`**${member.user.tag}** Sunucudan ayrıldı! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!`);
});
client.on("guildMemberRemove", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

    member.guild.channels.cache.get(channel).send(`**${member.user.tag}** Sunucuya Katıldı :tada:! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!`);
});