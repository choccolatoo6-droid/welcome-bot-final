require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

// Start web server immediately
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot is alive!");
}).listen(PORT, () => {
  console.log(`🌐 Web server running on port ${PORT}`);
});

// Check token
if (!process.env.TOKEN) {
  console.error("❌ No Discord token found in env variables");
  process.exit(1);
}

const rulesChannelID = '1437933382767083550';
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

// Discord events
client.once('ready', () => console.log(`✅ Logged in as ${client.user.tag}`));

client.on('guildMemberAdd', member => {
  console.log('👤 New member joined:', member.user.tag);

  const channel = member.guild.channels.cache.find(
    ch => ch.name === 'mossy-murmurs' && ch.isTextBased()
  );
  if (!channel) return console.log('❌ Channel not found');

  channel.send(
    ` 🌿 Welcome <@${member.id}>! Step softly among the petals and moss - this is your space to relax, share hobbies, and meet fellow wanderers. Feel free to settle in and say hi!
However, don't forget to check out <#${rulesChannelID}> and assign yourself roles in <id:customize> to join in the adventures! `
  );
});

// Log in bot
client.login(process.env.TOKEN)
  .then(() => console.log("🔑 Login promise resolved"))
  .catch(err => console.error("❌ LOGIN FAILED:", err));
