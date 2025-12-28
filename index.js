// debug-index.js (paste entire contents into index.js)
const http = require("http");
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot is alive!");
}).listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

require('dotenv').config();
const rulesChannelID = '1437933382767083550';

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// log ready
client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user?.tag}`);
});

// helpful debug events
client.on('error', err => console.error('client error:', err));
client.on('warn', info => console.warn('client warn:', info));
client.on('shardError', err => console.error('shardError:', err));
client.on('shardDisconnect', (event, shardId) => console.warn('shardDisconnect:', shardId, event));
client.on('shardReconnecting', id => console.log('shardReconnecting', id));
client.on('shardResume', (id, replayed) => console.log('shardResume', id, replayed));

// network/socket events (discord.js exposes ws)
if (client.ws && client.ws.on) {
  try {
    client.ws.on('debug', (m) => console.debug('ws debug:', m));
    client.ws.on('close', (code, reason) => console.warn('ws close:', code, reason && reason.toString()));
    client.ws.on('open', () => console.log('ws open'));
  } catch (e) {
    console.warn('ws listeners not available:', e);
  }
}

// global process errors
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
});
process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});

// heartbeat: print whether token exists and client status every 30s
setInterval(() => {
  console.log('HEARTBEAT: TOKEN exists?', !!process.env.TOKEN, 'client status:', client?.readyAt ? 'ready' : 'not-ready', 'uptime(ms):', process.uptime()*1000);
}, 30000);

// event handler
client.on('guildMemberAdd', async (member) => {
  console.log('👤 New member joined:', member.user.tag, 'guild:', member.guild.id);

  // Find channel by ID for stability
  const channel = member.guild.channels.cache.get(1437930456589795430);
  if (!channel) {
    console.log('❌ Channel not found by ID; falling back to name lookup');
    const byName = member.guild.channels.cache.find(ch => ch.name === 'mossy-murmurs' && ch.isTextBased());
    if (!byName) {
      console.log('❌ Channel not found by name either');
      return;
    }
  }

  try {
    console.log('✅ Sending welcome message to', channel?.id || 'byName');
    await (channel || byName).send(
      `🌿 Welcome <@${member.id}>! Step softly among the petals and moss. Check <#${rulesChannelID}> and role area.`
    );
    console.log('✅ Message sent');
  } catch (err) {
    console.error('❌ Send failed:', err);
  }
});

// login promise with error display
console.log('TOKEN exists?', !!process.env.TOKEN);
client.login(process.env.TOKEN)
  .then(() => console.log('🔑 Login promise resolved'))
  .catch(err => console.error('❌ LOGIN FAILED:', err));

