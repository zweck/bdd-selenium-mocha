const https = require('https');
const url = require('url');
const httpProxy = require('http-proxy');

const config = require('./config.json');
const { APP_URL, AUTH_USER, PROXY_PORT } = config;

const PORT = PROXY_PORT || 9009;

const host = url.parse( APP_URL ).host;

console.log(`listening on port ${PORT}`);
httpProxy.createProxyServer({
  agent: https.globalAgent,
  target: APP_URL,
  headers: {
    host,
    'Accenture-Identity': AUTH_USER
  }
})
  .on('error', function(proxyRes) {
    console.log('error', proxyRes);
  })
  .listen(PORT);

