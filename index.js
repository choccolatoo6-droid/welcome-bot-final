const http = require("http");

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot is alive!");
}).listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.on('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('guildMemberAdd', member => {
const channel = member.guild.channels.cache.find(
    ch => ch.name === 'general' && ch.isTextBased()
  );
  if (!channel) return;

const rulesChannelID = '1437933382767083550'

  channel.send(
   `🌿 Welcome <@${member.id}>! Step softly among the petals and moss - this is your space to relax, share hobbies, and meet fellow wanderers. Feel free to settle in and say hi!
However, don't forget to check out <#${rulesChannelID}> and assign yourself roles in <id:customize> to join in the adventures!  `
  );
});

client.login(process.env.TOKEN);
