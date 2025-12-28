// ws-test.js
const WebSocket = require('ws');

const token = process.env.TOKEN || 'MTQ0MTA1NDYzMjA0MTUxNzE5OQ.GrZBlw.D0akDEY2E99NXnXcKt8AQvH_vqOV_tT6xqNILE';
const gatewayUrl = 'wss://gateway.discord.gg/?v=10&encoding=json';

console.log('Starting WS test... token present?', !!token);

const ws = new WebSocket(gatewayUrl);

ws.on('open', () => {
  console.log('WS OPEN — connection established to gateway');
});

ws.on('error', (err) => {
  console.error('WS ERROR:', err && err.toString ? err.toString() : err);
});

ws.on('close', (code, reason) => {
  console.log('WS CLOSED', code, reason && reason.toString ? reason.toString() : reason);
});

ws.on('message', (msg) => {
  try {
    const o = JSON.parse(msg.toString());
    console.log('WS MSG:', o);
  } catch (e) {
    console.log('WS RAW MSG:', msg.toString());
  }
});

// close after 30s
setTimeout(() => {
  console.log('Ending WS test (30s)');
  ws.terminate();
  process.exit(0);
}, 30000);
