require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const http = require("http");

// Start HTTP server immediately so Render detects the port
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot is alive!");
}).listen(PORT, () => console.log(`🌐 Web server running on port ${PORT}`));

// Only start the bot after a short async delay
(async () => {
  try {
    const client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
    });

    client.once('ready', () => {
      console.log(`✅ Logged in as ${client.user.tag}`);
    });

    client.on('guildMemberAdd', member => {
      const channel = member.guild.channels.cache.find(
        ch => ch.name === 'mossy-murmurs' && ch.isTextBased()
      );
      if (!channel) return console.log('❌ Channel not found');
      channel.send(`🌿 Welcome <@${member.id}>! Check <#1437933382767083550> and assign yourself roles.`);
    });

    // Add a small delay to let the HTTP server fully initialize
    await new Promise(resolve => setTimeout(resolve, 1000));

    await client.login(process.env.TOKEN);
    console.log("🔑 Login promise resolved");
  } catch (err) {
    console.error("❌ LOGIN FAILED:", err);
    process.exit(1);
  }
})();
