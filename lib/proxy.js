const https = require('https');
const url = require('url');
const httpProxy = require('http-proxy');

const config = require('../config.json');
const { APP_URL, ADMIN_USER, PROXY_PORT } = config;

const PORT = PROXY_PORT || 9009;

const host = url.parse(APP_URL).host;

module.exports = class Proxy {
  constructor() {
    this._auth_user = ADMIN_USER;
    this._proxyServer = null;
  }

  start(auth_user = ADMIN_USER) {
    this._auth_user = auth_user;
    this._createProxyServer();
  }

  stop() {
    if(this._proxyServer) {
      this._proxyServer.close();
    }
  }

  setUser(auth_user) {
    this._auth_user = auth_user;
  }

  _createProxyServer() {
    console.log(`Proxying requests for user ${this._auth_user}`);

    if(this._proxyServer) {
      console.warn('Proxy server already running');  
      return; 
    }

    this._proxyServer = httpProxy.createProxyServer({
      agent: https.globalAgent,
      target: APP_URL,
      headers: {
        host,
      }
    })
    .on('proxyReq', (proxyReq) => {
      proxyReq.setHeader('Accenture-Identity', this._auth_user);
    })
    .on('error', (proxyRes) => {
      console.log('error', proxyRes);
    })
    .listen(PORT);
  }
};
